import Skill from "../Models/SkillSchema.js";

export const createSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    if (!skills) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const skillList = skills.split(",");
    await skillList.forEach(async (skill) => {
      await Skill.create({ skill });
    });
    res.status(200).json({
      message: "Skill created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create skill, Please try again later",
    });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all skills, Please try again later",
    });
  }
};

export const getSkillBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    // >> $regex: search, $options: "i" << case insensitive search
    const skills = await Skill.find({
      skill: { $regex: search, $options: "i" },
    });
    res.status(200).json({
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all skills, Please try again later",
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.skillId;
    await Skill.findByIdAndDelete(skillId);
    res.status(200).json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete skill, Please try again later",
    });
  }
};
