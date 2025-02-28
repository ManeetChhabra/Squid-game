import React, { useState } from "react";

const VideoWithPlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = document.getElementById("hero-video");
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Video Container */}
      <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
        {/* Video */}
        <video
          id="hero-video"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          className="w-full h-auto"
          muted
          onEnded={() => setIsPlaying(false)}
        />

        {/* Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition duration-300"
          >
            <div className="w-16 h-16 bg-orange-500 text-white flex items-center justify-center rounded-full shadow-md text-2xl transform hover:scale-110 transition-transform duration-300">
              ▶
            </div>
          </button>
        )}
      </div>

      {/* Caption */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-700 font-semibold text-lg">
          Enhance your learning experience with our platform.
        </p>
      </div>
    </div>
  );
};

export default VideoWithPlayButton;
