import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    videoUrl: { type: String },
    publicId: { type: String },
    isPreviewFree: { type: Boolean },

    quiz: {
      questions: [
        {
          questionText: { type: String, required: true },
          options: [{ type: String, required: true }],
          correctAnswerIndex: { type: Number, required: true }, // Index of the correct option
        },
      ],
    },
  },

  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);
