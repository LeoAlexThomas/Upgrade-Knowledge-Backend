import mongoose from "mongoose";

const LessonSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  recordingLink: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentInfo",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Lesson = mongoose.model("Lesson", LessonSchema);

export default Lesson;
