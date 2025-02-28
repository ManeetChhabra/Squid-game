import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  PaperAirplaneIcon,
  BookOpenIcon, // <-- Importing the BookOpenIcon
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = "AIzaSyAtV8nuqqKXDNbJ3yahxqGfzWxMBB-RmvU";
const genAI = new GoogleGenerativeAI(API_KEY);

const InterviewComponent = () => {
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState("General");

  // Example lesson data
  const lessons = [
    { id: 1, title: "Lesson 01: Introduction to Variables", time: "30 mins" },
    { id: 2, title: "Lesson 02: Control Statements", time: "30 mins" },
    { id: 3, title: "Lesson 03: Functions in MATLAB", time: "30 mins" },
    { id: 4, title: "Lesson 04: Working with Arrays", time: "30 mins" },
    { id: 5, title: "Lesson 05: MATLAB Visualization", time: "30 mins" },
    { id: 6, title: "Lesson 06: Loops and Iterations", time: "30 mins" },
  ];

  // Pastel background colors for each lesson item (to alternate, if desired)
  const backgroundColors = [
    "bg-[#FDF2EC]", // peach
    "bg-[#FEECEC]", // light pink
    "bg-[#FDF2EC]",
    "bg-[#FEECEC]",
    "bg-[#FDF2EC]",
    "bg-[#FEECEC]",
  ];

  // Fetch a new interview question based on the selected skill
  const getNewQuestion = async () => {
    setLoading(true);
    setFeedback(""); // clear previous feedback
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Ask a tough mock interview question for software engineers focused on ${skill}.`;
      const response = await model.generateContent(prompt);
      const text = (await response.response.text()).replace(/\*/g, "");
      setQuestion(text);
    } catch (error) {
      console.error("Error fetching question:", error);
      setQuestion("Failed to fetch question. Try again.");
    }
    setLoading(false);
  };

  // Submit the user's answer and get AI feedback
  const evaluateAnswer = async () => {
    if (!userAnswer) return;
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Evaluate this interview answer: "${userAnswer}". Provide constructive feedback and a rating from 1 to 10.`;
      const response = await model.generateContent(prompt);
      const text = (await response.response.text()).replace(/\*/g, "");
      setFeedback(text);
    } catch (error) {
      console.error("Error evaluating answer:", error);
      setFeedback("Failed to evaluate answer. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    getNewQuestion();
  }, [skill]);

  return (
    <div className="flex mt-24 min-h-screen">
      {/* --- NEW SIDEBAR --- */}
      <aside className="w-1/4 bg-white p-6 text-gray-800">
        <h2 className="text-xl font-extrabold mb-6 uppercase">PRACTICE QUIZ</h2>
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className={`flex items-center justify-between p-4 rounded-md shadow-sm ${backgroundColors[index]}`}
            >
              {/* Left Section: Icon + Lesson Title */}
              <div className="flex items-center space-x-2">
                <BookOpenIcon className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700 text-sm">
                  {lesson.title}
                </span>
              </div>
              {/* Right Section: Duration */}
              <span className="text-sm text-gray-600">{lesson.time}</span>
            </div>
          ))}
        </div>
      </aside>
      {/* --- END NEW SIDEBAR --- */}

      {/* Main Content */}
      <div className="w-3/4 p-10 bg-white">
        <motion.header
          className="bg-orange-500 text-white p-6 rounded-xl text-2xl font-extrabold shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Module 1: AI Mock Interview
        </motion.header>

        <motion.div
          className="mt-6 p-6 bg-[#FFF2E5] border border-gray-200 rounded-xl shadow-sm text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4">Instructions: Please Read Carefully</h3>
          <ul className="list-disc list-inside text-gray-800 leading-6 text-sm space-y-2">
            <li>
              <strong>Answer the Questions:</strong> Each question has an input field
              where you can type your answer. Make sure your response is clear and accurate.
            </li>
            <li>
              <strong>Time Limit:</strong> You have 30 seconds to answer each question.
              The timer will be displayed at the top of the screen.
            </li>
            <li>
              <strong>Submitting Your Answers:</strong> Once you type your answer, click
              the <em>Submit</em> button to confirm. If time runs out, the question will
              be marked as unanswered.
            </li>
            <li>
              <strong>Results:</strong> After all questions are completed, your score
              and performance summary will be displayed.
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="mt-6 p-6 bg-white border border-gray-200 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800">
            {loading ? "Fetching question..." : question}
          </h3>
        </motion.div>

        <motion.textarea
          className="w-full p-4 mt-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300"
          rows="4"
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        ></motion.textarea>

        <div className="flex mt-6 space-x-4">
          <motion.button
            className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300"
            onClick={evaluateAnswer}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
          >
            <PaperAirplaneIcon className="w-6 h-6 mr-2" />
            Submit Answer
          </motion.button>
          <motion.button
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300"
            onClick={getNewQuestion}
            whileHover={{ scale: 1.05 }}
          >
            New Question
          </motion.button>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              className="p-6 mt-8 bg-green-100 border border-green-400 rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">AI Feedback</h3>
              <p className="text-gray-800">{feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InterviewComponent;
