import jwt, { JwtPayload } from "jsonwebtoken";
interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";
const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tooken = req.cookies.jwt;
    if (!tooken) {
      return res.status(401).json({ error: "unauthorized Token" });
    }
    const decoded = jwt.verify(tooken, process.env.JWT_SECRET!) as DecodedToken;
    if (!decoded) {
      return res.status(401).json({ error: "unauthorized invalid token" });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, fullName: true, profilePic: true },
    });
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error: any) {
    console.log("erro in protection route ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectedRoute;
