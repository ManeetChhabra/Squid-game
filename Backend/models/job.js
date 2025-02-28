import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Internship"] },
    description: { type: String, required: true },
    requirements: { type: [String] },
    salary: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // HR posting the job
    applications: [
      {
        applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User applying for the job
        resume: { type: String, required: true }, // Resume link (Cloudinary or local)
        status: { type: String, enum: ["Applied", "Reviewed", "Accepted", "Rejected"], default: "Applied" },
        appliedAt: { type: Date, default: Date.now },
      },
    ] , // Users applying for job
  },
 

  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);