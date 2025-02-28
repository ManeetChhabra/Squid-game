import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Quizdesign = () => {
  // Extract moduleIndex from the URL query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const moduleIndex = searchParams.get('moduleIndex');

  const [lectureTitle, setLectureTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: [''],
      correctAnswerIndex: 0,
    },
  ]);

  // Add a new question to the quiz
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: [''], correctAnswerIndex: 0 },
    ]);
  };

  // Remove a question from the quiz
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Handle changes to question text or the correct answer index
  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle changes to option text
  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new option to a specific question
  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  // Remove an option (if there's more than one)
  const removeOption = (qIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].options.length > 1) {
      updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
        (_, i) => i !== optionIndex
      );
      setQuestions(updatedQuestions);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      lectureTitle,
      moduleIndex,
      quiz: { questions },
    };

    // Replace this with your actual API call (using fetch, axios, etc.)
    console.log('Submitting payload:', payload);
  };

  return (
    <div className="min-h-screen mt-24 bg-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl text-center text-orange-600 font-bold mb-4"
      >
        Create Lecture & Quiz
      </motion.h1>

      {moduleIndex && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-center text-orange-500 mb-6"
        >
          Designing Quiz for Module {moduleIndex}
        </motion.h2>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white border border-orange-300 rounded-lg p-6 shadow-lg"
      >
        {/* Lecture Title */}
        <div className="mb-6">
          <label className="block text-orange-600 font-bold mb-2">
            Lecture Title
          </label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            required
            className="w-full p-3 border border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter lecture title"
          />
        </div>

        {/* Quiz Questions */}
        <div className="mb-6">
          <h2 className="text-2xl text-orange-600 font-semibold mb-4">
            Quiz Questions
          </h2>
          <AnimatePresence>
            {questions.map((question, qIndex) => (
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-6 border border-orange-200 p-4 rounded shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-orange-600">
                    Question {qIndex + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, 'questionText', e.target.value)
                  }
                  required
                  className="w-full p-3 border border-orange-500 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter question text"
                />
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-2">
                    Options
                  </h3>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-3">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={question.correctAnswerIndex === optionIndex}
                        onChange={() =>
                          handleQuestionChange(qIndex, 'correctAnswerIndex', optionIndex)
                        }
                        className="mr-3"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, optionIndex, e.target.value)
                        }
                        required
                        className="w-full p-3 border border-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      {question.options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOption(qIndex, optionIndex)}
                          className="ml-3 text-red-500 hover:text-red-700 transition duration-200"
                        >
                          X
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(qIndex)}
                    className="mt-2 text-orange-500 hover:text-orange-700 transition duration-200"
                  >
                    + Add Option
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
          >
            + Add Question
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-200"
          >
            Save Lecture & Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quizdesign;
