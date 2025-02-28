import React from "react";

const Goals = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Our Goals</h2>
        <p className="text-gray-600 text-center mt-2">
          At SkillBridge, our goal is to empower individuals from all backgrounds to thrive in the world of design and development. We believe that education should be accessible and transformative, enabling learners to pursue their passions and make a meaningful impact. Through our carefully crafted courses, we aim to
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
            <div className="text-yellow-500 text-4xl mr-4">
              <span>📒</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Provide Practical Skills</h3>
              <p className="text-gray-600 mt-2">
                We focus on delivering practical skills that are relevant to the current industry demands. Our courses are designed to equip learners with the knowledge and tools needed to excel in their chosen field.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
            <div className="text-yellow-500 text-4xl mr-4">
              <span>📖</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Foster Creative Problem-Solving</h3>
              <p className="text-gray-600 mt-2">
                We encourage creative thinking and problem-solving abilities, allowing our students to tackle real-world challenges with confidence and innovation.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
            <div className="text-yellow-500 text-4xl mr-4">
              <span>🧩</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Promote Collaboration and Community</h3>
              <p className="text-gray-600 mt-2">
                We believe in the power of collaboration and peer learning. Our platform fosters a supportive and inclusive community where learners can connect, share insights, and grow together.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md p-6 rounded-lg">
            <div className="text-yellow-500 text-4xl mr-4">
              <span>🌟</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Stay Ahead of the Curve</h3>
              <p className="text-gray-600 mt-2">
                The digital landscape is constantly evolving, and we strive to stay at the forefront of industry trends. We regularly update our course content to ensure our students receive the latest knowledge and skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;
