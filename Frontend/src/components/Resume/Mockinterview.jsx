import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PaperAirplaneIcon, BookOpenIcon } from "@heroicons/react/24/solid";

const modulesList = [
  "Data Structures",
  "Algorithms",
  "React.js",
  "Node.js",
  "Machine Learning",
];

// Pastel background colors (reused in a cycle)
const backgroundColors = [
  "bg-[#FDF2EC]",
  "bg-[#FEECEC]",
  "bg-[#FDF2EC]",
  "bg-[#FEECEC]",
  "bg-[#FDF2EC]",
  "bg-[#FEECEC]",
];

const MockInterview = () => {
  const [skill, setSkill] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const API_KEY = "AIzaSyAtV8nuqqKXDNbJ3yahxqGfzWxMBB-RmvU";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const getNewQuestion = async () => {
    if (!skill) return alert("Please select a module first!");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Generate a multiple-choice interview question for ${skill}. Provide 4 answer options and mark the correct answer. Format: Question, Option1, Option2, Option3, Option4, CorrectOption.`;

      const response = await model.generateContent(prompt);
      const generatedText =
        response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) throw new Error("No valid response from AI");

      const lines = generatedText
        .split("\n")
        .filter((line) => line.trim() !== "");

      if (lines.length < 6)
        throw new Error("Unexpected response format from AI");

      setQuestion(lines[0]);
      setOptions(lines.slice(1, 5));
      setSelectedAnswer(null);
      setFeedback("");
    } catch (error) {
      console.error("Error fetching question:", error.message);
      alert("Failed to fetch question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    if (!selectedAnswer) return alert("Please select an answer first!");
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `The question was: "${question}"\nUser selected: "${selectedAnswer}".\nWas it correct? Provide a brief explanation.`;

      const response = await model.generateContent(prompt);
      const generatedText =
        response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) throw new Error("No valid response from AI");

      setFeedback(generatedText);
    } catch (error) {
      console.error("Error evaluating answer:", error.message);
      alert("Failed to evaluate answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startTest = () => {
    if (!skill) return alert("Please select a module from the side panel!");
    setTestStarted(true);
    getNewQuestion();
  };

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-br from-white to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
            AI Mock Interview Module
          </h1>
          <p className="mt-3 text-xl">
            Test your skills with dynamic AI-generated interview questions.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex mt-10 space-x-6 px-4">
        {/* SIDEBAR (Replaced with new design) */}
        <aside className="w-72 bg-white border border-orange-300 rounded-xl p-6 shadow-xl transform transition-all duration-500 hover:scale-105 text-gray-800">
          <h2 className="text-xl font-extrabold mb-6 uppercase">PRACTICE QUIZ</h2>
          <div className="space-y-4">
            {modulesList.map((mod, index) => (
              <div
                key={index}
                onClick={() => setSkill(mod)}
                className={`flex items-center justify-between p-4 rounded-md shadow-sm cursor-pointer transition transform duration-300 hover:scale-105 ${
                  backgroundColors[index % backgroundColors.length]
                } ${skill === mod ? "ring-2 ring-orange-400" : ""}`}
              >
                {/* Left Section: Icon + Module Title */}
                <div className="flex items-center space-x-2">
                  <BookOpenIcon className="h-5 w-5 text-gray-600" />
                  <span className="font-semibold text-gray-700 text-sm">
                    {mod}
                  </span>
                </div>
                {/* Right Section: (Static) Duration */}
                <span className="text-sm text-gray-600">30 mins</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-xl p-8 shadow-xl">
          {!testStarted ? (
            // Instruction Panel
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-orange-500 border-b pb-2">
                Instructions
              </h2>
              <p className="text-gray-700 text-lg">
                Welcome to the AI Mock Interview Module. Please select a module
                from the side panel. Once a module is selected, click{" "}
                <span className="font-bold text-orange-500">Start Test</span> to
                begin your interview.
              </p>
              {skill && (
                <p className="text-xl text-gray-800">
                  Selected Module:{" "}
                  <span className="font-semibold">{skill}</span>
                </p>
              )}
              <button
                className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 transform hover:scale-105 ${
                  skill
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={startTest}
                disabled={!skill || loading}
              >
                Start Test
              </button>
            </div>
          ) : (
            // Interview Panel
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-gray-50 border border-orange-300 rounded-xl p-8 shadow-inner transition transform hover:scale-105">
                <h2 className="text-3xl font-bold text-orange-500 mb-4 border-b pb-2">
                  Module: {skill}
                </h2>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    Question:
                  </h3>
                  {loading ? (
                    <p className="text-gray-500 text-lg animate-pulse">
                      Loading question...
                    </p>
                  ) : (
                    <p className="text-lg text-gray-700">{question}</p>
                  )}
                </div>
                <div className="space-y-4">
                  {options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-4 border border-orange-200 rounded-lg cursor-pointer hover:bg-orange-50 transition-colors duration-300"
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => setSelectedAnswer(option)}
                        className="w-5 h-5 text-orange-500 focus:ring-orange-400"
                      />
                      <span className="ml-3 text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
                <div className="flex space-x-6 mt-8">
                  <button
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transition transform hover:scale-105"
                    onClick={evaluateAnswer}
                    disabled={loading}
                  >
                    <PaperAirplaneIcon className="w-6 h-6" />
                    <span>Submit Answer</span>
                  </button>
                  <button
                    className="flex-1 py-3 bg-gray-300 hover:bg-gray-200 rounded-lg text-gray-800 font-semibold transition-colors duration-300 transform hover:scale-105"
                    onClick={getNewQuestion}
                    disabled={loading}
                  >
                    New Question
                  </button>
                </div>
              </div>

              {feedback && (
                <div className="bg-white border border-orange-300 rounded-xl p-8 shadow-xl transition transform hover:scale-105">
                  <h3 className="text-2xl font-bold text-orange-500 mb-4 border-b pb-2">
                    AI Feedback
                  </h3>
                  <p className="text-gray-800 text-lg">{feedback}</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MockInterview;
