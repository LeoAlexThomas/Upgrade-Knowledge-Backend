import mongoose from "mongoose";

const ExperienceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  experienceInYear: {
    type: Number,
    required: true,
  },
});

const Experience = mongoose.model("Experience", ExperienceSchema);

export default Experience;
