import express from "express";
import {
  adminAuthMiddleware,
  authMiddleware,
  studentAuthMiddleware,
  tutorAuthMiddleware,
} from "../Middlewares/AuthMiddleware.js";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedbacks,
  getFeedbacksOfTutor,
} from "../Controllers/FeedbackController.js";

const router = express.Router();

router.post("/create", authMiddleware, studentAuthMiddleware, createFeedback);

router.get(
  "/allFeedback",
  authMiddleware,
  adminAuthMiddleware,
  getAllFeedbacks
);

router.get(
  "/allFeedbackForTutor/:tutorId",
  authMiddleware,
  tutorAuthMiddleware,
  getFeedbacksOfTutor
);

router.delete(
  "/deleteFeedback/:feedbackId",
  authMiddleware,
  studentAuthMiddleware,
  deleteFeedback
);

export default router;
