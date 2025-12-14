import express from "express";
import { getStudentInfo } from "../Controllers/StudentController.js";

const router = express.Router();

router.get("/:studentId", getStudentInfo);

export default router;
