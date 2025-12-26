import Tutor from "../Models/TutorSchema.js";

export const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find().populate([
      {
        path: "user",
        select: "-password -token -resetPin -resetPinValidity",
      },
      "students",
      "reviews",
      "payments",
      "lessons",
      "feedbacks",
    ]);

    res.status(200).json({
      data: tutors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all tutors, Please try again later",
    });
  }
};

export const getTutorById = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;
    if (!tutorId) {
      res.status(400).json({
        message: "Tutor id is not found",
      });
    }

    const tutor = await Tutor.findById(tutorId).populate([
      {
        path: "user",
        select: "-password -token -resetPin -resetPinValidity",
      },
      "students",
      "reviews",
      "payments",
      "lessons",
      "feedbacks",
    ]);

    res.status(200).json({
      data: tutor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get tutor, Please try again later",
    });
  }
};

export const updateSlots = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;
    if (!tutorId) {
      res.status(400).json({
        message: "Tutor id is not found",
      });
    }

    const tutor = await Tutor.findById(tutorId).populate([
      "user",
      "students",
      "reviews",
      "payments",
      "lessons",
      "feedbacks",
    ]);
    if (!tutor) {
      res.status(404).json({
        message: "Tutor not found",
      });
    }

    tutor.availableSlots = req.body.slots;
    await tutor.save();

    res.status(200).json({
      message: "Slots updated successfully",
      data: tutor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update slots, Please try again later",
    });
  }
};
