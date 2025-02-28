// app.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import instructorRouter from "./routes/instructor.js";

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Update this URL as needed
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/instructor", instructorRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
