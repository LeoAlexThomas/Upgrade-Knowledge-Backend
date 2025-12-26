import mongoose from "mongoose";

const LessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    meetLink: {
      type: String,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    recordingLink: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    sessionStartDate: {
      type: String,
      required: true,
    },
    sessionEndDate: {
      type: String,
      required: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentInfo",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model("Lesson", LessonSchema);

export default Lesson;
