import express from "express";
import {
  addReview,
  deleteReview,
  getReviewsOfTutor,
  updateReview,
} from "../Controllers/ReviewController.js";
import {
  authMiddleware,
  studentAuthMiddleware,
  tutorAuthMiddleware,
} from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, studentAuthMiddleware, addReview);

router.get(
  "/allReviewForTutor/:tutorId",
  authMiddleware,
  tutorAuthMiddleware,
  getReviewsOfTutor
);

router.put(
  "/updateReview/:reviewId",
  authMiddleware,
  studentAuthMiddleware,
  updateReview
);

router.delete(
  "/deleteReview/:reviewId",
  authMiddleware,
  studentAuthMiddleware,
  deleteReview
);

export default router;
