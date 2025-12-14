import User from "../Models/UserSchema.js";

export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get user info, Please try again later",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all user info, Please try again later",
    });
  }
};

export const getUsersWithStudentRole = async (req, res) => {
  try {
    const users = await User.find({ role: "student" });

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get all student users info, Please try again later",
    });
  }
};

export const getStudentTutor = async (req, res) => {
  try {
    const tutor = await User.find({ role: "tutor" })
      .where("studentIds")
      .find(req.user._id);
    if (!tutor) {
      res.status(404).json({
        message: "Tutor not found",
      });
    }
    res.status(200).json({
      data: tutor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get tutor, Please try again later",
    });
  }
};
