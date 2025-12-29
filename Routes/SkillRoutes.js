import express from "express";
import {
  createSkills,
  deleteSkill,
  getAllSkills,
  getSkillBySearch,
} from "../Controllers/SkillController.js";

const router = express.Router();

router.get("/all", getAllSkills);

router.get("/search/:search", getSkillBySearch);

router.post("/create", createSkills);

router.delete("/delete/:skillId", deleteSkill);

export default router;
