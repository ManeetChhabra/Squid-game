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
      await api.post("/jobs/create", job);
      alert("Job posted successfully!");
      setJob({ title: "", company: "", location: "", description: "", requirements: "", salary: "" });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <input name="title" value={job.title} onChange={handleChange} placeholder="Job Title" required className="input-field" />
      <input name="company" value={job.company} onChange={handleChange} placeholder="Company Name" required className="input-field" />
      <input name="location" value={job.location} onChange={handleChange} placeholder="Location" required className="input-field" />
      <textarea name="description" value={job.description} onChange={handleChange} placeholder="Job Description" required className="input-field" />
      <textarea name="requirements" value={job.requirements} onChange={handleChange} placeholder="Requirements" required className="input-field" />
      <input name="salary" value={job.salary} onChange={handleChange} placeholder="Salary (Optional)" className="input-field" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Post Job</button>
    </form>
  );
};

export default JobPostingForm;
