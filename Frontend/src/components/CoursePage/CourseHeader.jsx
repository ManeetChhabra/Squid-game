import React from "react";
import Navbar from "../Navbar/Navbar";

const Header = () => {
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
        <source src="../src/assets/Videos/208682_large.mp4" type="video/mp4" />
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
          ⚡ <span className="text-orange-500"> Unlock - </span> Explore. Enroll. Excel.
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-10 max-w-3xl">
        Unlock hidden gems! Discover underrated courses that set you apart
        </p>
        <div className="flex space-x-6 mb-12">
          <button className="bg-orange-500 text-white px-8 py-4 text-lg lg:text-xl rounded-md font-semibold hover:bg-orange-600 transition">
Meet The Team           </button>
          
        </div>
      </div>
    </div>
  );
};

export default Header;