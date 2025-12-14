import mongoose from "mongoose";

const FeedbackSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  feedbackDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
