import { Router } from "express";
import {
  login,
  protectMiddleware,
  register,
  updatePassword,
  userProfile,
  resetPassword,
  forgotPassword
} from "@/middleware/authentication";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", protectMiddleware, userProfile);
router.post("/change-password", protectMiddleware, updatePassword);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

export default router;
