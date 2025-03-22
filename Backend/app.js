// app.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/database.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import instructorRouter from "./routes/instructorRoute.js";
import jobRouter from "./routes/jobRoute.js";
//import videoRouter from "./routes/videoRoute.js";


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
    origin: "https://skill-sensei-frontend.onrender.com", // Update this URL as needed
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/instructor", instructorRouter);
app.use("/api/v1/jobs", jobRouter);
//app.use("/api/v1/introductory-videos", videoRouter);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
