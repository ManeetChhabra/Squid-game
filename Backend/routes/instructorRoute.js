import express from "express";
import { createCourse } from "../controllers/instructorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadFiles } from "../utils/multer.js";

const router = express.Router();

// ✅ Create Course with Multiple Modules & Upload Lectures
router.post("/", authMiddleware, uploadFiles, createCourse);

export default router;