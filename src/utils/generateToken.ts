import jwt from "jsonwebtoken";
import { Response } from "express";
const generateToken = (userId: String, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //milliseconds
    httpOnly: true, //prevent xss cross scripting attacks
    sameSite: "strict", //csrf attacks site forgery
    secure: process.env.NODE_ENV !== "development", //https
  });
  return token;
};
export default generateToken;
