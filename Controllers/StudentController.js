import Student from "../Models/StudentSchema.js";
import Tutor from "../Models/TutorSchema.js";
import User from "../Models/UserSchema.js";
import Review from "../Models/ReviewSchema.js";
import PaymentInfo from "../Models/PaymentSchema.js";
import Lesson from "../Models/LessonSchema.js";
import Feedback from "../Models/FeedbackSchema.js";

export const getStudentInfo = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    if (!studentId) {
      res.status(404).json({
        message: "Student not found",
      });
    }

    const student = await Student.findOne({ _id: studentId }).populate([
      { path: "user", select: "-password -token" },
      { path: "tutors", select: "-password -token" },
      "reviews",
      "payments",
      "lessons",
      "feedbacks",
    ]);

    res.status(200).json({
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to get student info, Please try again later",
    });
  }
};
