import React, { useState } from "react";
import { motion } from "framer-motion";

const LessonHeader = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayButton = () => {
    setIsPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg max-w-7xl mx-auto mb-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left">
          01 | MATLAB and VLSI Foundations
        </h1>
      </div>

      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-md">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              onClick={handlePlayButton}
              className="bg-white text-gray-800 rounded-full p-3 sm:p-4 shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              >
                <path d="M10 15l6-3-6-3v6z" />
                <path
                  fillRule="evenodd"
                  d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-2 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </motion.div>
  );
};

export default LessonHeader;
