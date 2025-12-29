import express from "express";
import {
  adminAuthMiddleware,
  authMiddleware,
  tutorAuthMiddleware,
} from "../Middlewares/AuthMiddleware.js";
import {
  getAllUsers,
  getCurrentUser,
  getStudentTutor,
  getUsersWithStudentRole,
  updateUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/current", authMiddleware, getCurrentUser);
router.get("/all", authMiddleware, adminAuthMiddleware, getAllUsers);
router.get(
  "/allStudentUsers",
  authMiddleware,
  tutorAuthMiddleware,
  getUsersWithStudentRole
);
router.get("/getTutor", authMiddleware, getStudentTutor);

router.put("/updateUserInfo", authMiddleware, updateUser);

export default router;
