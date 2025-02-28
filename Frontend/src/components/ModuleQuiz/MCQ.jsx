import { useState } from "react";

const MCQ = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const lessons = [
    { title: "Lesson 1: MATLAB Basics", duration: "15 min", active: true },
    { title: "Lesson 2: Working with Arrays", duration: "20 min", active: false },
    { title: "Lesson 3: Simulations in MATLAB", duration: "30 min", active: false },
  ];

  return (
    <div className="flex bg-orange-100 mt-20 min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white border-r border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">PRACTICE QUIZ</h2>
        <div className="space-y-2">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                lesson.active
                  ? "bg-green-100 border-l-4 border-green-500"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0l3-3m-3 3l-3-3m0 12a9 9 0 100-18 9 9 0 000 18z"
                    />
                  </svg>
                </span>
                <span className="text-sm text-gray-700">{lesson.title}</span>
              </div>
              <span className="text-xs text-gray-500">{lesson.duration}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center py-10">
      <div className="w-[600px] mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">01 | MATLAB and VLSI Foundations</h1>
        <p className="text-md text-gray-600">Introduction about Matlab</p>
      </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
          {/* Heading */}
         

          <h2 className="text-xl font-bold mb-2">
            What is MATLAB primarily used for in engineering and science?
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            (Hint: Think about data analysis, mathematical modeling, and simulations)
          </p>
          <div className="space-y-3">
            {["For Packet Switching", "For Schematic diagram", "For Simulation", "For running terminal commands"].map((option, index) => (
              <label
                key={index}
                className={`flex items-center space-x-2 p-2 border rounded cursor-pointer ${
                  selectedOption === option ? "bg-orange-300" : "bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    selectedOption === option ? "border-orange-500" : "border-gray-400"
                  }`}
                >
                  {selectedOption === option && <div className="w-3 h-3 bg-orange-500 rounded-full"></div>}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6 w-[600px] text-gray-700">
          <p>
            <strong>Next Module:</strong> Lesson 2 : Working with Arrays
          </p>
          <p>
            <strong>Previous Module:</strong> Nil
          </p>
          <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "46%" }}></div>
          </div>
          <p className="mt-1">Your Progress : 46%</p>
        </div>

        <div className="mt-4 flex gap-4">
          <button className="bg-orange-500 text-white px-6 py-2 rounded shadow hover:bg-orange-600">Previous</button>
          <button className="bg-orange-500 text-white px-6 py-2 rounded shadow hover:bg-orange-600">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MCQ;
