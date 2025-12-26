import mongoose from "mongoose";

const TutorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Student",
      default: [],
    },
    lessons: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Lesson",
      default: [],
    },
    availableSlots: {
      type: [
        {
          startDate: {
            type: Date,
            required: true,
          },
          endDate: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
      required: true,
    },
    expertises: {
      type: [String],
      default: [],
      required: true,
    },
    experience: {
      type: Number,
      ref: "Experience",
    },
    payments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "PaymentInfo",
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
  },
  {
    timestamps: true,
  }
);

const Tutor = mongoose.model("Tutor", TutorSchema);

export default Tutor;
