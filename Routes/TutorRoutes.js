import express from "express";
import {
  adminAuthMiddleware,
  authMiddleware,
  tutorAuthMiddleware,
} from "../Middlewares/AuthMiddleware.js";
import {
  getAllTutors,
  getTutorById,
  updateSlots,
} from "../Controllers/TutorController.js";

const router = express.Router();

router.get("/allTutors", authMiddleware, adminAuthMiddleware, getAllTutors);

router.get("/:tutorId", authMiddleware, getTutorById);

router.put(
  "/updateSlots/:tutorId",
  authMiddleware,
  tutorAuthMiddleware,
  updateSlots
);

export default router;
