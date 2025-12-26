import express from "express";
import {
  adminAuthMiddleware,
  authMiddleware,
  tutorAuthMiddleware,
} from "../Middlewares/AuthMiddleware.js";
import {
  createLesson,
  deleteLesson,
  getAllLessons,
  getLessonCreatedByTutor,
  updateLesson,
} from "../Controllers/LessonController.js";

const router = express.Router();

router.get("/all", authMiddleware, adminAuthMiddleware, getAllLessons);

router.get(
  "/myLessons",
  authMiddleware,
  tutorAuthMiddleware,
  getLessonCreatedByTutor
);

router.post("/create", authMiddleware, tutorAuthMiddleware, createLesson);

router.put(
  "/update/:lessonId",
  authMiddleware,
  tutorAuthMiddleware,
  updateLesson
);

router.delete(
  "/delete/:lessonId",
  authMiddleware,
  tutorAuthMiddleware,
  deleteLesson
);

export default router;
