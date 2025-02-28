import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["instructor", "student"],
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    rewardPoints: { 
      type: Number, 
      default: 0,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
