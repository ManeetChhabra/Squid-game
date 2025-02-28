import React from "react";

const JobHeader = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center py-36 px-6 md:px-20">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
            “We are a dedicated team committed to empowering learners worldwide with cutting-edge resources in design, technology, and development. Our mission is to provide high-quality, accessible, and innovative learning experiences that equip individuals with the skills they need to excel in today’s fast-evolving digital world.”
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-md text-sm font-semibold shadow-md hover:bg-gray-800 transition">Explore more</button>
        </div>
        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative w-60 md:w-80">
            <img src="./src/assets/Images/image 14.png" alt="AI Tutor" className="w-full" />
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="text-center py-12 mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Learn smarter, not harder – your personal AI tutor is here!
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          With our AI chatbot, you'll get personalized guidance that simplifies complex topics and helps you focus on what matters most in your studies.
        </p>
      </div>
    </div>
  );
};

export default JobHeader;
