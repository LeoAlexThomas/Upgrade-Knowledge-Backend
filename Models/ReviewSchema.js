import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  reviewDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
