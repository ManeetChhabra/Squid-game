import React from "react";

const ChillGuy = () => {
  const lessons = [
    { title: "Understanding UI/UX Design Principles", duration: "45 Minutes", lesson: "Lesson 01" },
    { title: "Understanding UI/UX Design Principles", duration: "45 Minutes", lesson: "Lesson 02" },
    { title: "Understanding UI/UX Design Principles", duration: "45 Minutes", lesson: "Lesson 03" },
  ];

  const sections = [
    {
      title: "01",
      subtitle: "Introduction to UI/UX Design",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.75 3.75a8 8 0 11-7.5 10.88M10.75 3.75v6.5m0-6.5L8.25 6m5.5-2.25l3.5 3.5"
          />
        </svg>
      ),
    },
    {
      title: "02",
      subtitle: "User Research and Analysis",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.75V19a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19v-6.25"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10.5h18m-9-9v6.25m0-6.25L6.75 6m3.25 6l6.75 6"
          />
        </svg>
      ),
    },
    {
      title: "03",
      subtitle: "User Research and Analysis",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.75V19a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19v-6.25"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10.5h18m-9-9v6.25m0-6.25L6.75 6m3.25 6l6.75 6"
          />
        </svg>
      ),
    },
    {
      title: "04",
      subtitle: "User Research and Analysis",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.75V19a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19v-6.25"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10.5h18m-9-9v6.25m0-6.25L6.75 6m3.25 6l6.75 6"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-wrap justify-center items-start p-4 md:p-8">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="w-full md:w-1/2 p-4">
          <div className="flex items-center mb-6">
            {section.icon}
            <h2 className="text-3xl font-bold text-gray-800 ml-4">
              {section.title}{" "}
              <span className="text-base font-medium text-gray-500">{section.subtitle}</span>
            </h2>
          </div>
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 shadow-md flex items-center justify-between bg-white"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">{lesson.lesson}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-1 text-gray-400"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                    </svg>
                    {lesson.duration}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-red-600"
                  >
                    <path d="M10 15l5-3-5-3v6z" />
                    <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChillGuy;
