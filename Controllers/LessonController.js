import Lesson from "../Models/LessonSchema.js";

export const createLesson = async (req, res) => {
  try {
    const { title, description, price, sessionStartDate, sessionEndDate } =
      req.body;

    if (
      !title ||
      !description ||
      !price ||
      !sessionStartDate ||
      !sessionEndDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const tutorId = req.user.tutor._id;

    const newLesson = await Lesson.create({
      title,
      description,
      sessionStartDate,
      sessionEndDate,
      tutor: tutorId,
      price,
    });

    res.status(200).json({
      data: newLesson,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create lesson, Please try again later",
    });
  }
};

export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate([
      "tutor",
      "student",
      "payment",
    ]);

    res.status(200).json({
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all lessons, Please try again later",
    });
  }
};

export const getLessonCreatedByTutor = async (req, res) => {
  try {
    const lessons = await Lesson.find({ tutor: req.user.tutor._id }).populate([
      "tutor",
      "student",
      "payment",
    ]);

    res.status(200).json({
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all lessons, Please try again later",
    });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { title, description, price, sessionStartDate, sessionEndDate } =
      req.body;

    if (
      !title ||
      !description ||
      !price ||
      !sessionStartDate ||
      !sessionEndDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const lessonId = req.params.lessonId;
    const tutorId = req.user.tutor._id;

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      res.status(404).json({
        message: "Lesson not found",
      });
    }

    if (lesson.tutor.toString() !== tutorId.toString()) {
      res.status(401).json({
        message: "You are not authorized to update this lesson",
      });
    }

    lesson.title = title;
    lesson.description = description;
    lesson.sessionStartDate = sessionStartDate;
    lesson.sessionEndDate = sessionEndDate;
    lesson.price = price;

    await lesson.save();

    res.status(200).json({
      message: "Lesson updated successfully",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update lesson, Please try again later",
    });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const tutorId = req.user.tutor._id;

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      res.status(404).json({
        message: "Lesson not found",
      });
    }

    if (lesson.tutor.toString() !== tutorId.toString()) {
      res.status(401).json({
        message: "You are not authorized to delete this lesson",
      });
    }

    await lesson.deleteOne({ _id: lessonId });

    res.status(200).json({
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete lesson, Please try again later",
    });
  }
};
