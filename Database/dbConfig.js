import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

export default connectDB;
