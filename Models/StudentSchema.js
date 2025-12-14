import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tutors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tutor",
    default: [],
  },
  lessons: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Lesson",
    default: [],
  },
  payments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "PaymentInfo",
    default: [],
  },
  recordingLinks: {
    type: [String],
    default: [],
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    default: [],
  },
  feedbacks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Feedback",
    default: [],
  },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
