import React, { useState } from 'react';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const questions = [
    {
      question: "Can I enroll in multiple courses at once?",
      answer: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
    },
    {
      question: "What kind of support can I expect from instructors?",
      answer: "Instructors are available to provide detailed feedback, answer questions, and offer guidance throughout the course.",
    },
    {
      question: "Are the courses self-paced or do they have specific start and end dates?",
      answer: "Most courses are self-paced, but some may have specific schedules. Please check the course details for exact information.",
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "Some courses have prerequisites, which are listed in the course description. Many are beginner-friendly!",
    },
    {
      question: "Can I download the course materials for offline access?",
      answer: "Yes, many courses allow you to download materials for offline learning.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="mb-6">Still have any questions? Contact our Team via support@skillbridge.com</p>
        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm overflow-hidden bg-white">
              <button
                className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-medium text-lg">{item.question}</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    openQuestion === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  {openQuestion === index ? "✕" : "+"}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openQuestion === index ? "max-h-screen p-4" : "max-h-0"
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
          See All FAQ's
        </button>
      </div>
    </div>
  );
};

export default FAQ;
