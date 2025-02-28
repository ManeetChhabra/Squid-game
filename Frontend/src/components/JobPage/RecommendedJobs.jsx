import React from "react";
import { motion } from "framer-motion";

const JobCards = [
  {
    title: "Senior UI Designer",
    company: "Foodmandu",
    location: "Kathmandu, Nepal",
    type: "Fulltime",
    salary: "NRs. 25000",
  },
  ...Array(7).fill({
    title: "Senior UI Designer",
    company: "Foodmandu",
    location: "Kathmandu, Nepal",
    type: "Fulltime",
    salary: "NRs. 25000",
  }),
];

const JobCard = ({ job }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-5 w-full sm:w-[320px] md:w-[280px] lg:w-[320px] transition-transform duration-200 hover:scale-105 hover:shadow-2xl mb-8"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-gray-700 w-12 h-12 rounded-full"></div>
        <div>
          <h4 className="font-semibold text-gray-900">{job.company}</h4>
          <p className="text-gray-500 text-sm">{job.location}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
      <p className="text-gray-600 text-sm">{job.type}</p>
      <p className="text-gray-500 text-sm mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-orange-500">{job.salary}</span>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all">
          Apply Now
        </button>
      </div>
    </motion.div>
  );
};

const RecommendedJobs = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Recommended <span className="text-orange-500">Jobs</span>
        </h2>
        <button className="text-gray-700 font-bold flex items-center hover:text-orange-500 transition-all">
          Show all jobs ➝
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
  {JobCards.map((job, index) => (
    <JobCard key={index} job={job} />
  ))}
</div>
    </div>
  );
};

export default RecommendedJobs;