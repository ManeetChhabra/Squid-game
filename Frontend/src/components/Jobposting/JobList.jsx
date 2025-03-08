import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const scrollRef = useRef(null);

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const applyForJob = async (jobId) => {
    if (!selectedFile) {
      alert("Please upload your resume before applying.");
      return;
    }
  
    try {
      console.log("🟢 Applying for Job ID:", jobId);
  
      const userResponse = await axios.get("http://localhost:3015/api/v1/user/authcheck", {
        withCredentials: true, // ✅ Ensures cookies are sent
      });
  
      console.log("🟢 User Response:", userResponse.data);
  
      const user = userResponse.data.user;
      if (!user) {
        alert("User data not received! Check backend response.");
        return;
      }
  
      if (user.role !== "student") {
        alert("Only students are allowed to apply for jobs.");
        return;
      }
  
      // ✅ Prepare FormData for file upload
      const formData = new FormData();
      formData.append("resume", selectedFile);
  
      console.log("🟢 Sending Form Data:", formData);
  
      const response = await axios.post(
        `http://localhost:3015/api/v1/jobs/apply/${jobId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );
  
      console.log("✅ Job Application Response:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("❌ Error applying for job:", error);
      if (error.response) {
        console.error("❌ Server Response Error:", error.response.data);
        alert(error.response.data.message || "Failed to apply. Please try again.");
      } else {
        alert("Something went wrong. Check console logs.");
      }
    }
  };
  
  

  // Scroll Left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  // Scroll Right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mt-16 py-12 px-6 relative overflow-hidden">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Available Jobs
      </h2>

      {/* Left Arrow Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white p-3 rounded-full shadow-md hover:bg-orange-500 transition"
        onClick={scrollLeft}
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Scrollable Job List */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto  scrollbar-hide space-x-6 p-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {jobs.map((job) => (
          <div
            key={job._id}
            className="w-[350px] min-w-[350px] p-6 bg-white shadow-lg rounded-xl transition-transform hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <div className="text-gray-800 space-y-2">
              <p className="font-medium">🏢 {job.company}</p>
              <p>📍 {job.location}</p>
              <p className="text-green-600 font-bold">
                💰 Salary: ${job.salary || "Negotiable"}
              </p>
            </div>

            {/* File Input */}
            <label className="block mt-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="cursor-pointer bg-gray-200 p-2 rounded text-center text-gray-700 hover:bg-gray-300 transition">
                Upload Resume
              </div>
            </label>

            {/* Apply Button */}
            <button
              onClick={() => applyForJob(job._id)}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white p-3 rounded-full shadow-md hover:bg-orange-500 transition"
        onClick={scrollRight}
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default JobList;
