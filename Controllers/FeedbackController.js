import Feedback from "../Models/FeedbackSchema.js";

export const createFeedback = async (req, res) => {
  try {
    const { tutorId, feedback } = req.body;

    if (!tutorId || !feedback) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newFeedback = await Feedback.create({
      student: req.user.student._id,
      tutor: tutorId,
      feedback,
    });

    res.status(200).json({
      message: "Feedback added",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to add feedback, Please try again later",
    });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    res.status(200).json({
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all feedbacks, Please try again later",
    });
  }
};

export const getFeedbacksOfTutor = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;

    if (!tutorId) {
      res.status(400).json({
        message: "Tutor id is not found",
      });
    }

    const feedbacks = await Feedback.find({ tutor: tutorId });

    res.status(200).json({
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get feedbacks, Please try again later",
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.feedbackId;
    const studentId = req.user.student._id;

    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      res.status(404).json({
        message: "Feedback not found",
      });
    }

    if (feedback.student.toString() !== studentId.toString()) {
      res.status(401).json({
        message: "You are not authorized to delete this feedback",
      });
    }

    await feedback.deleteOne({ _id: feedbackId });

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete feedback, Please try again later",
    });
  }
};
