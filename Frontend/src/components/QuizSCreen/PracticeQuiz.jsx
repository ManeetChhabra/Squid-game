import React from "react";

const PracticeQuiz = () => {
  const lessons = [
    { title: "Lesson 01: Introduction to Variables", duration: "30 mins" },
    { title: "Lesson 02: Control Statements", duration: "30 mins" },
    { title: "Lesson 03: Functions in MATLAB", duration: "30 mins" },
    { title: "Lesson 04: Working with Arrays", duration: "30 mins", active: true },
    { title: "Lesson 05: MATLAB Visualization", duration: "30 mins" },
    { title: "Lesson 06: Loops and Iterations", duration: "30 mins" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-14 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white border-r border-gray-200 p-4">
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
      <main className="flex-1 bg-orange-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              01 | MATLAB and VLSI Foundations
            </h1>
            <p className="text-sm text-gray-600">
              Introduction about Matlab
            </p>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H8.25A2.25 2.25 0 006 5.25V9m12 6v3.75a2.25 2.25 0 01-2.25 2.25h-5.25A2.25 2.25 0 018.25 18.75V15"
              />
            </svg>
            1 hour
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">
    Instructions: Please Read Carefully
  </h2>
  <ul className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
    <li>
      <span className="font-medium">Answer the Questions:</span>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Each question has an input field where you can type your answer.</li>
        <li>Make sure your response is clear and accurate.</li>
      </ul>
    </li>
    <li>
      <span className="font-medium">Time Limit:</span>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>You have 30 seconds to answer each question.</li>
        <li>The timer will be displayed at the top of the screen.</li>
      </ul>
    </li>
    <li>
      <span className="font-medium">Submitting Your Answers:</span>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Once you type your answer, click the Submit button to confirm.</li>
        <li>If time runs out, the question will be marked as unanswered.</li>
      </ul>
    </li>
    <li>
      <span className="font-medium">Results:</span>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          After all questions are completed, your score and performance summary
          will be displayed.
        </li>
      </ul>
    </li>
  </ul>
</div>

        {/* Questions */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            What is MATLAB primarily used for in engineering and science?
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            (Hint: Think about data analysis, mathematical modeling, and
            simulations)
          </p>
          <input
            type="text"
            placeholder="Your Answer"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Explain the difference between a vector and a matrix in MATLAB
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            (Provide a simple definition for both with examples.)
          </p>
          <input
            type="text"
            placeholder="Your Answer"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </main>
    </div>
  );
};

export default PracticeQuiz;
