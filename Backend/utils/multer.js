import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// ✅ Middleware to handle course thumbnail & multiple lecture videos
export const uploadFiles = upload.fields([
  { name: "courseThumbnail", maxCount: 1 },  // ✅ Single Thumbnail
  { name: "videoUrl", maxCount: 10 }   // ✅ Multiple Lectures
]);
