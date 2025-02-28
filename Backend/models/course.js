
import mongoose from "mongoose";  
const moduleSchema = new mongoose.Schema({
  moduleTitle: { type: String, required: true },  
  lecture: {
    title: { type: String, }, // Lecture Title (same as Module)
    videoUrl: { type: String }, // ✅ Stores the uploaded lecture video URL
    publicId: { type: String }
  },
  quiz: {
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswerIndex: { type: Number, required: true }
      }
    ]
  },
  isPreview: { type: Boolean, default: false }
});

const courseSchema = new mongoose.Schema(
  {
    courseTitle: { type: String, required: true },
    description: { type: String,  },
    category: { type: String },
    courseThumbnail: { type: String, default: "https://img.freepik.com/free-vector/e-learning-icons-flat_1284-3950.jpg" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    modules: [moduleSchema], // ✅ Each course can have multiple modules
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"],  },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isPublished: { type: Boolean, default: false },
    price: { type: Number, required: true },
    cquiz:{
      questions: [
        {
          questionText: { type: String, required: true },
          options: [{ type: String, required: true }],
          correctAnswerIndex: { type: Number, required: true }
        }
      ]
    }
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
