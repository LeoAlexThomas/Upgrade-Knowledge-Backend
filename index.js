import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/dbConfig.js";
import authRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import studentRoutes from "./Routes/StudentRoutes.js";
import LessonRoutes from "./Routes/LessonRoutes.js";
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDB();

// Default middleware
app.use(express.json());
app.use(cors());

// Default route for all backend
app.get("/", (req, res) => {
  res.send("Hai, Welcome to Upgrade Knowledge Backend!");
});

// Auth route
app.use("/api/auth", authRoutes);

// User route
app.use("/api/user", userRoutes);

// Student route
app.use("/api/student", studentRoutes);

// Lesson route
app.use("/api/lesson", LessonRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
