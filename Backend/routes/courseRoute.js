import express from "express";
import {
  getAllCourses,
 
  getCourseQuiz,
} from "../controllers/courseController.js";
import { getModuleDetails } from "../controllers/courseController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all courses
router.get("/", getAllCourses);

// Get course quiz (Move this above module route to prevent conflict)
router.get("/:courseId/cquiz", getCourseQuiz);

// Get module details
router.get("/:courseId/:moduleId", getModuleDetails);

export default router;

