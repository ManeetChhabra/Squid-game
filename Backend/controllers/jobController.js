import { Job } from "../models/job.js";
import { uploadMedia } from "../utils/cloudinary.js";

// Create a Job (Only HR can post jobs)
export const createJob = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "HR") {
      return res.status(403).json({ message: "Only HR can post jobs." });
    }

    const { title, company, location, jobType, description, requirements, salary } = req.body;

    if (!title || !company || !location  || !description ) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      description,
      requirements,
      salary,
      postedBy: req.user.id,
    });

    return res.status(201).json({ job, message: "Job posted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create job", error: error.message });
  }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email"); // Populate HR details
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};

// Get a Job by ID
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate("postedBy", "name email");

    if (!job) return res.status(404).json({ message: "Job not found." });

    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch job", error: error.message });
  }
};

// Apply for a Job (Only students can apply)
/*export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { resume } = req.body; // Resume link or file path

    // ✅ Check if resume is provided
    if (!resume) {
      return res.status(400).json({ message: "Resume is required to apply!" });
    }

    // ✅ Find the job by ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }

    // ✅ Prevent duplicate applications
    const alreadyApplied = job.applications.find((app) => app.applicant.toString() === req.user.id);
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job!" });
    }

    // ✅ Add application to job
    job.applications.push({
      applicant: req.user.id,
      resume,
    });

    await job.save();
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};*/
export const applyForJob = async (req, res) => {
    try {
      // Ensure a file (resume) is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Please upload a resume." });
      }
  
      console.log("Resume uploaded:", req.file.filename); // Debugging output
  
      return res.status(200).json({ message: "Job application successful!" });
    } catch (error) {
      console.error("Error applying for job:", error.message);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  

// Delete Job (Only HR can delete)
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!req.user || req.user.role !== "HR") {
      return res.status(403).json({ message: "Only HR can delete jobs." });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this job." });
    }

    await job.deleteOne();
    return res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};