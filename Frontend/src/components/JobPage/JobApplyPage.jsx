import { useState } from "react";
import { FaBookmark, FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const JobApplyPage = () => {
  const [filters, setFilters] = useState({
    jobType: ["Part time"],
    jobCategories: ["Sales", "Business"],
    jobLevel: [],
  });

  const jobs = [
    { title: "Senior Graphic Designer", company: "Foodmandu", type: "Full time", location: "Koteshwor, Nepal" },
    { title: "UI/UX Designer", company: "Foodmandu", type: "Full time", location: "Koteshwor, Nepal" },
    { title: "Frontend Web Developer", company: "Foodmandu", type: "Full time", location: "Koteshwor, Nepal" },
    { title: "Fullstack React Developer", company: "Foodmandu", type: "Full time", location: "Koteshwor, Nepal" },
    { title: "Sales Manager", company: "Foodmandu", type: "Full time", location: "Koteshwor, Nepal" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Discover more than <span className="text-orange-500">5000+ jobs</span>
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 shadow-md rounded-lg">
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full">
          <FaSearch className="text-gray-500" />
          <input type="text" placeholder="Enter job title, keyword" className="outline-none ml-2 w-full text-gray-700" />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full">
          <FaMapMarkerAlt className="text-gray-500" />
          <input type="text" placeholder="Location, country, city, state" className="outline-none ml-2 w-full text-gray-700" />
        </div>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all shadow-md">
          Search
        </button>
      </div>

      {/* Content Section */}
      <div className="mt-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="md:w-1/4 bg-white shadow-md p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-3">Job Type</h2>
          {["Full time", "Part time", "Remote", "Internship", "Contract"].map((type) => (
            <label key={type} className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={filters.jobType.includes(type)} className="accent-orange-500" />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}

          <h2 className="font-semibold text-lg mt-4 mb-3">Job Categories</h2>
          {["Design", "Sales", "Marketing", "Finance", "Technology"].map((category) => (
            <label key={category} className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={filters.jobCategories.includes(category)} className="accent-orange-500" />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>

        {/* Job Listings */}
        <div className="md:w-3/4">
          <h2 className="text-xl font-semibold mb-2">All Jobs</h2>
          <p className="text-gray-500 mb-4">Showing {jobs.length} results</p>

          {jobs.map((job, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">{job.type} • {job.location}</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all">
                  Apply Now
                </button>
                <FaBookmark className="text-gray-600 cursor-pointer hover:text-orange-500 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobApplyPage;
