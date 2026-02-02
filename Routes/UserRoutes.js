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
  updateUserBio,
  uploadImage,
} from "../Controllers/UserController.js";
import upload from "../Config/Multer.js";

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

router.put(
  "/updateProfileImage",
  authMiddleware,
  upload.single("file"),
  uploadImage
);

router.put("/updateBio", authMiddleware, updateUserBio);

router.put("/updateUserInfo", authMiddleware, updateUser);

export default router;
