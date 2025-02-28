import React, { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3015/api/v1/jobs", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Apply for a job
  const applyForJob = async (jobId) => {
    if (!selectedFile) {
      alert("Please select a resume before applying.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:3015/api/v1/jobs/apply/${jobId}`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <div className="max-w-6xl mt-24 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="p-6 border rounded-md shadow-lg bg-white">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.description}</p>
            <p className="text-gray-800 font-medium">Company: {job.company}</p>
            <p className="text-gray-800">Location: {job.location}</p>
            <p className="text-gray-900 font-semibold">Salary: ${job.salary}</p>
            
            {/* File Input for Resume Upload */}
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange} 
              className="mt-4 block w-full border p-2"
            />

            <button 
              onClick={() => applyForJob(job._id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
