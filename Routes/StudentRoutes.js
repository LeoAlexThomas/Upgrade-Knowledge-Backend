import express from "express";
import {
  getAllStudents,
  getStudentInfo,
} from "../Controllers/StudentController.js";
import {
  adminAuthMiddleware,
  authMiddleware,
  studentAuthMiddleware,
} from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get(
  "/:studentId",
  authMiddleware,
  studentAuthMiddleware,
  getStudentInfo
);
router.get("/all", authMiddleware, adminAuthMiddleware, getAllStudents);

export default router;
