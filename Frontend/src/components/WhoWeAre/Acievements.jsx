import React from "react";

const Achievements = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Achievements</h2>
        <p className="text-gray-600 text-center mt-2">
          Our commitment to excellence has led us to achieve significant milestones along our journey. Here are some of our notable achievements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
            <div className="text-yellow-500 text-4xl mr-4">
              <span>👑</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Trusted by Thousands</h3>
              <p className="text-gray-600 mt-2">
                We have successfully served thousands of students, helping them unlock their potential and achieve their career goals.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
            <div className="text-yellow-500 text-4xl mr-4">
              <span>🏆</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Award-Winning Courses</h3>
              <p className="text-gray-600 mt-2">
                Our courses have received recognition and accolades in the industry for their quality, depth of content, and effective teaching methodologies.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
            <div className="text-yellow-500 text-4xl mr-4">
              <span>🎭</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Positive Student Feedback</h3>
              <p className="text-gray-600 mt-2">
                We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
            <div className="text-yellow-500 text-4xl mr-4">
              <span>⚡</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Industry Partnerships</h3>
              <p className="text-gray-600 mt-2">
                We have established strong partnerships with industry leaders, enabling us to provide our students with access to the latest tools and technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
