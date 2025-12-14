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
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/current", authMiddleware, getCurrentUser);
router.get("/all", authMiddleware, adminAuthMiddleware, getAllUsers);
router.get(
  "/allStudents",
  authMiddleware,
  tutorAuthMiddleware,
  getUsersWithStudentRole
);
router.get("/getTutor", authMiddleware, getStudentTutor);

export default router;
