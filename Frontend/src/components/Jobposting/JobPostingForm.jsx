import React, { useState } from "react";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    workMode: "Work from home",
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    requiredSkills: "",
    experienceLevel: "",
    contactDetails: "",
    salaryRange: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl w-full">
        {/* Form Section */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold text-black mb-4">Job Posting Form</h2>
          <div className="flex gap-4 mb-6">
            {['Work from home', 'Offline', 'Hybrid'].map((mode) => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="workMode"
                  value={mode}
                  checked={formData.workMode === mode}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                {mode}
              </label>
            ))}
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              { name: "jobTitle", placeholder: "Job Title" },
              { name: "companyName", placeholder: "Company Name" },
              { name: "location", placeholder: "Location" },
              { name: "jobType", placeholder: "Job Type" },
              { name: "requiredSkills", placeholder: "Required Skills" },
              { name: "experienceLevel", placeholder: "Experience Level" },
              { name: "contactDetails", placeholder: "Contact Details" },
              { name: "salaryRange", placeholder: "Salary Range" },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                className="w-full border rounded-md p-3 text-gray-700"
                onChange={handleChange}
              />
            ))}
            
            <textarea
              name="jobDescription"
              placeholder="Job Description"
              className="w-full border rounded-md p-3 text-gray-700 h-24"
              onChange={handleChange}
            ></textarea>
            
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-1/2 relative bg-orange-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="./src/assets/Images/Illustration (1).png"
              alt="Job posting illustration"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute text-white text-center p-6">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;