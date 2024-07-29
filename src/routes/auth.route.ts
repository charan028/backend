import express from "express";
import {
  login,
  logout,
  signup,
  getMe,
} from "../controllers/auth.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
const router = express.Router();
router.get("/me", protectedRoute, getMe);
router.post("/logout", logout);
router.post("/signup", signup);
router.post("/login", login);
export default router;
