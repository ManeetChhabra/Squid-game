import React, { useState } from "react";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = document.getElementById("hero-video");
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
    <div className="text-center p-10 mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">01 | MATLAB and VLSI Foundations</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget
            elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum
            eget habitasse in velit fringilla feugiat senectus in.
          </p>
        </div>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Video Container */}
      
      <div className="relative w-full max-w-7xl"> {/* Increased max-width */}
        {/* Video */}
        <video
          id="hero-video"
          src="your-video-url.mp4" // Replace with your video link
          className="w-full h-auto rounded-lg"
          muted
          onEnded={() => setIsPlaying(false)}
        />

        {/* Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg"
          >
            <div className="w-20 h-20 bg-yellow-400 text-black flex items-center justify-center rounded-full shadow-lg text-3xl">
              ▶
            </div>
          </button>
        )}
      </div>
    </div>

    </>
  );
};

export default Video;
