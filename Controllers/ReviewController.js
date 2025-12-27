import Review from "../Models/ReviewSchema.js";

export const addReview = async (req, res) => {
  try {
    const { tutorId, rating, review } = req.body;

    if (!tutorId || !rating || !review) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newReview = new Review({
      student: req.user._id,
      tutor: tutorId,
      rating,
      review,
    });

    await newReview.save();

    res.status(200).json({
      message: "Review added",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to add review, Please try again later",
    });
  }
};

export const getReviewsOfTutor = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;

    if (!tutorId) {
      res.status(400).json({
        message: "Tutor id is not found",
      });
    }

    const reviews = await Review.find({ tutor: tutorId });

    res.status(200).json({
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get reviews, Please try again later",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    if (!reviewId) {
      res.status(400).json({
        message: "Review id is not found",
      });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete review, Please try again later",
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    if (!reviewId) {
      res.status(400).json({
        message: "Review id is not found",
      });
    }

    const { rating, review } = req.body;

    if (!rating || !review) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const reviewToUpdate = await Review.findById(reviewId);

    if (!reviewToUpdate) {
      res.status(404).json({
        message: "Review not found",
      });
    }

    reviewToUpdate.rating = rating;
    reviewToUpdate.review = review;

    await reviewToUpdate.save();

    res.status(200).json({
      message: "Review updated successfully",
      data: reviewToUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update review, Please try again later",
    });
  }
};
