import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const MentorCard = () => {
  const handleScheduleSession = () => {
    window.location.href = "https://kani21.daily.co/TzK7Hs9DL3CdAS80lgq3"; // Replace with your actual Daily.co room link
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl max-w-5xl w-full overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-2/3 flex flex-col">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden mb-4">
                <img
                  src="https://apiwp.thelocal.com/cdn-cgi/image/format=webp,width=1200,quality=75/https://apiwp.thelocal.com/wp-content/uploads/2018/12/6d67730d16af04f3f956389d4cc244af808b8381c23b1e3d218ecd792de14fa8.jpg"
                  alt="Mentor Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-white mt-4">Mr. Kal Smith</h2>
              <p className="text-xl text-orange-100 mt-2">Mathematics Specialist</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                <p className="text-gray-600 mt-2">Italy School of Engineering</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-orange-600 font-bold text-2xl">5+</p>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-orange-600 font-bold text-2xl">500+</p>
                  <p className="text-gray-600">Students Taught</p>
                </div>
              </div>
            </div>

            <button 
              className="w-full mt-8 bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
              onClick={handleScheduleSession}
            >
              Schedule a Session
            </button>
            
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:block w-1/3 relative bg-orange-100">
          <div className="absolute inset-0">
            <img
              src="./src/assets/Images/Illustration.png"
              alt="Teaching Mathematics"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/50 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white"></div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
