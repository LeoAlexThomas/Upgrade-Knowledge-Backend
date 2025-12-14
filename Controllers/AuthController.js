import User from "../Models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../Utils/mailer.js";
import Student from "../Models/StudentSchema.js";
import Tutor from "../Models/TutorSchema.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({
        message: "Password is incorrect",
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      message: "User loggedIn successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to process login, Please try again later",
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, studentInfo, tutorInfo } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(400).json({
        message: "This mail id is already exist. Please try to login",
      });
    }
    const userId = new mongoose.Types.ObjectId();
    let roleId = null;

    if (role === "student") {
      const student = new Student({
        user: userId,
      });
      await student.save();
      roleId = student._id;
    } else if (role === "tutor") {
      if (!tutorInfo) {
        res.status(400).json({
          message: "Tutor information is required",
        });
      }
      const tutor = new Tutor({
        user: userId,
        ...tutorInfo,
      });
      await tutor.save();
      roleId = tutor._id;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      _id: userId,
      name,
      email,
      password: hashedPassword,
      role,
      student: role === "student" ? roleId : null,
      tutor: role === "tutor" ? roleId : null,
    });

    await newUser.save();

    res.status(200).json({
      message: "User registered successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to process register new user, Please try again later",
    });
  }
};

export const changeRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "user role updated",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Unable to change user role, Please ask admin to change user role",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User mail is not found",
      });
    }

    // Generating random 4 digit number;
    const resetPin = getRandomNumber(1001, 9999);
    // Setting validity date for the pin
    const now = new Date();
    // Creating jwt token for user identification
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Storing pin, validity date and token to user info
    user.resetPin = resetPin;
    user.resetPinValidity = now.setHours(now.getHours() + 1);
    user.token = jwtToken;
    await user.save();

    // Sending reset link mail to user mail id
    await sendEmail({
      to: email,
      subject: "Reset Password Link",
      htmlText: `Here is link for password reset <a href="${process.env.FRONTEND_URL}/resetPassword?token=${jwtToken}&pin=${resetPin}">Reset Password</a>, this link is valid upto <b>1 hour</b> from mail received`,
    });

    res.status(200).json({
      message: "Mail sent to given mail address",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to send mail",
    });
  }
};

export const verifyResetPin = async (req, res) => {
  try {
    const { pin, token } = req.body;
    // Verifying user token which is sent with reset link
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // Getting user info based on decoded user id
    const user = await User.findById(decoded.userId);
    // Getting current Date & time
    const now = new Date().getTime();
    // Getting validity date & time from user info
    const validityLimit = user.resetPinValidity?.getTime();
    // Checking is still pin is valid or not
    if ((!validityLimit && !user.resetPin) || validityLimit - now <= 0) {
      res.status(401).json({
        message: "Pin is expired, please get new link",
      });
      return;
    }
    // Checking user entered pin and stored pin
    if (pin !== user.resetPin) {
      res.status(401).json({
        message: "Pin is incorrect",
      });
      return;
    }

    res.status(200).json({
      message: "Pin is verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot verify pin, Error in verifying pin",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    // Verifying user token which is sent with reset link
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Getting user info based on decoded user id
    const user = await User.findById(decoded.userId);

    // Checking user is available in db
    if (!user) {
      res.status(401).json({
        message: "User not found, Please get new reset link",
      });
      return;
    }
    // Hashing the new password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Storing new hashed password to user info
    user.password = hashedPassword;
    // Resetting resetPin value and resetPinValidity value to null current pin after password is changed
    user.resetPin = null;
    user.resetPinValidity = null;

    await user.save();
    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot change password, Error in changing password",
    });
  }
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
