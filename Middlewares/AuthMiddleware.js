import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/UserSchema.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    if (!token) {
      res.status(401).json({
        message: "Token is missing",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // removing password and token from user object and send to client
    const user = await User.findById(decoded.userId).select("-password -token");

    if (!user) {
      res.status(401).json({
        message: "User not found, Please login / register user",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Unable authorize the user",
    });
  }
};

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "admin") {
      res.status(401).json({
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Unable check the user is admin auth",
    });
  }
};

export const tutorAuthMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "tutor") {
      res.status(401).json({
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Unable check the user is tutor auth",
    });
  }
};
