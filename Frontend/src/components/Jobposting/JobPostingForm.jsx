import React, { useState } from "react";
import { api } from "../../axios.config"; // Import API configuration

const JobPostingForm = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    salary: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs/create", job,{ withCredentials: true });
      alert("Job posted successfully!");
      setJob({ title: "", company: "", location: "", description: "", requirements: "", salary: "" });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Job Title */}
        <div>
          <label className="block text-gray-300 mb-1">Job Title</label>
          <input 
            type="text" 
            name="title" 
            value={job.title} 
            onChange={handleChange} 
            placeholder="Enter job title" 
            required 
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-300 mb-1">Company Name</label>
          <input 
            type="text" 
            name="company" 
            value={job.company} 
            onChange={handleChange} 
            placeholder="Enter company name" 
            required 
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-300 mb-1">Location</label>
          <input 
            type="text" 
            name="location" 
            value={job.location} 
            onChange={handleChange} 
            placeholder="Enter job location" 
            required 
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-gray-300 mb-1">Job Description</label>
          <textarea 
            name="description" 
            value={job.description} 
            onChange={handleChange} 
            placeholder="Enter job description" 
            required 
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 h-28"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-gray-300 mb-1">Requirements</label>
          <textarea 
            name="requirements" 
            value={job.requirements} 
            onChange={handleChange} 
            placeholder="Enter job requirements" 
            required 
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 h-28"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-300 mb-1">Salary (Optional)</label>
          <input 
            type="text" 
            name="salary" 
            value={job.salary} 
            onChange={handleChange} 
            placeholder="Enter salary details" 
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg transition duration-300">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;