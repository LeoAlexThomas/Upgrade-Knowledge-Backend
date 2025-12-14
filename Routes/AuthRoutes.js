import express from "express";
import {
  changeRole,
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  verifyResetPin,
} from "../Controllers/AuthController.js";
import {
  adminAuthMiddleware,
  authMiddleware,
} from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// Sending mail to user mail for reset link and pin for verification
router.post("/getResetLink", forgotPassword);
// Checking pin and stored pin in user info
router.post("/verifyResetPin", verifyResetPin);
// Change user password
router.put("/resetPassword", resetPassword);
// Update role of password with admin role
router.patch("/updateRole", authMiddleware, adminAuthMiddleware, changeRole);

export default router;
