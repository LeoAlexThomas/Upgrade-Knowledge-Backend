import mongoose from "mongoose";

const SkillSchema = mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", SkillSchema);
export default Skill;
