import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBcRPoW4qAVmkhW-oODcxUCDPQO9T5Dwp4";

const MockInterview = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Specify the API version explicitly (switch from v1beta to v1)
  const genAI = new GoogleGenerativeAI(API_KEY, { version: "v1" });

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "text-bison-001" });
      const prompt =
        "Generate a multiple-choice question with four options and indicate the correct answer. Format: Question, Option1, Option2, Option3, Option4, CorrectOption.";
      const response = await model.generateContent(prompt);
      const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) throw new Error("Invalid response from AI");
      
      const lines = text.split("\n").filter(line => line.trim() !== "");
      if (lines.length < 6) throw new Error("Unexpected AI response format");
      
      setQuestion(lines[0]);
      setOptions(lines.slice(1, 5));
      setFeedback("");
      setSelectedAnswer(null);
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
      const model = genAI.getGenerativeModel({ model: "text-bison-001" });
      const prompt = `Question: "${question}"\nSelected: "${selectedAnswer}"\nIs it correct? Explain briefly.`;
      const response = await model.generateContent(prompt);
      const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Invalid response from AI");
      setFeedback(text);
    } catch (error) {
      console.error("Error evaluating answer:", error.message);
      alert("Failed to evaluate answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">AI Mock Interview</h1>
      <button
        onClick={fetchQuestion}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Loading..." : "Get Question"}
      </button>
      {question && (
        <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">{question}</h2>
          {options.map((option, index) => (
            <label
              key={index}
              className="block mb-2 p-2 border rounded cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="answer"
                value={option}
                onChange={() => setSelectedAnswer(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
          <button
            onClick={evaluateAnswer}
            disabled={loading || !selectedAnswer}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit Answer
          </button>
          {feedback && <p className="mt-4 text-gray-700">{feedback}</p>}
        </div>
      )}
    </div>
  );
};

export default MockInterview;
