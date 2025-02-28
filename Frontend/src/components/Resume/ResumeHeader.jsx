import React from "react";
import Navbar from "../Navbar/Navbar";

const Resumeheader = () => {
  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full w-full h-full object-cover opacity-100"
      >
        <source src="https://cdn.pixabay.com/video/2019/05/19/23778-337668484_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Navbar */}
      <div className="absolute top-0 w-full z-10">
        <Navbar />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 mt-32">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          ⚡ <span className="text-orange-500">Unlock</span> Your Creative Potential
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-10 max-w-3xl">
          with Online Design and Development Courses.
          <br />
          Learn from Industry Experts and Enhance Your Skills.
        </p>
        <div className="flex space-x-6 mb-12">
          <button className="bg-orange-500 text-white px-8 py-4 text-lg lg:text-xl rounded-md font-semibold hover:bg-orange-600 transition">
            Explore Courses
          </button>
          <button className="bg-gray-200 text-gray-800 px-8 py-4 text-lg lg:text-xl rounded-md font-semibold hover:bg-gray-300 transition">
            View Pricing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resumeheader;