import { Course } from "../models/course.js";  // Keep original import
import { uploadMedia } from "../utils/cloudinary.js";  
import { uploadFiles } from "../utils/multer.js";  

export const createCourse = async (req, res) => {
  try {
    console.log("Incoming Request: ", req.body);
    console.log("Uploaded Files: ", req.files);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { courseTitle, description, category, difficulty, price, modules, cquiz } = req.body;

    if (!courseTitle || !description || !difficulty || price == null || !modules) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    let courseThumbnail = "https://img.freepik.com/free-vector/e-learning-icons-flat_1284-3950.jpg";
    if (req.files && req.files.courseThumbnail) {
      const uploadResult = await uploadMedia(req.files.courseThumbnail[0].path);
      courseThumbnail = uploadResult.secure_url;
    }

    console.log("Incoming Modules:", modules);

    // Parse modules correctly
    let parsedModules;
    try {
      parsedModules = JSON.parse(modules);
      console.log("Parsed Modules after JSON Parse:", parsedModules);
      if (!Array.isArray(parsedModules)) throw new Error("Modules must be an array");
    } catch (error) {
      console.error("Error parsing modules: ", error);
      return res.status(400).json({ message: "Invalid modules format" });
    }

    // Handle video uploads
    if (req.files && req.files.videoUrl) {
      for (let i = 0; i < req.files.videoUrl.length; i++) {
        const file = req.files.videoUrl[i];
        const uploadResult = await uploadMedia(file.path, "video");
        if (parsedModules[i]) {
          parsedModules[i].lecture = {
            title: parsedModules[i].moduleTitle,
            videoUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id
          };
        }
      }
    }

    // Parse cquiz if provided
    let parsedCquiz = null;
    if (cquiz) {
      try {
        parsedCquiz = JSON.parse(cquiz);
        if (!parsedCquiz.questions || !Array.isArray(parsedCquiz.questions)) {
          return res.status(400).json({ message: "Invalid cquiz format: 'questions' must be an array" });
        }
      } catch (error) {
        console.error("Error parsing cquiz: ", error);
        return res.status(400).json({ message: "Invalid cquiz format" });
      }
    }

    const course = await Course.create({
      courseTitle,
      description,
      category,
      difficulty,
      price,
      createdBy: req.user.id,
      courseThumbnail,
      modules: parsedModules,
      cquiz: parsedCquiz  // Add the course quiz
    });

    res.status(201).json({ course, message: "Course created successfully." });

  } catch (error) {
    console.error("Internal Server Error: ", error);
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
};