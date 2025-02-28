import React, { useState, useEffect } from "react";
import {api} from "../../axios.config.js";

const CourseViewer = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/courses");
        setCourses(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleModuleClick = async (courseId, moduleId, course) => {
    try {
      const { data } = await api.get(`/courses/${courseId}/${moduleId}`);
      setActiveModule(data);
      setCurrentCourse(course);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch module details");
    }
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeModule.quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Course Modules
        </h1>

        <div className="grid grid-cols-1 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-6 border rounded-xl bg-gradient-to-r from-orange-100 to-white shadow-md"
            >
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold text-orange-500 mr-4">
                  {course.courseTitle}
                </h2>
                <span className="text-gray-600">
                  {course.modules?.length || 0} Modules
                </span>
              </div>

              <div className="space-y-4">
                {course.modules?.map((module, index) => (
                  <button
                    key={module._id}
                    onClick={() => handleModuleClick(course._id, module._id, course)}
                    className="w-full"
                  >
                    <div className="flex items-center justify-between bg-white p-4 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-transform ease-in-out duration-300">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {module.moduleTitle}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Module {String(index + 1).padStart(2, '0')}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
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
                            d="M12 6v6l4 2"
                          />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                        View Module
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Viewer Modal */}
      {activeModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 bg-gradient-to-r from-orange-100 to-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {currentCourse?.courseTitle}
                  </h2>
                  <h3 className="text-xl text-gray-600 mt-2">
                    {activeModule.moduleTitle}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setActiveModule(null);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {activeModule.lecture && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {activeModule.lecture.title}
                  </h4>
                  <video
                    src={activeModule.lecture.videoUrl}
                    controls
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}

              {activeModule.quiz && activeModule.quiz.questions && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Module Quiz
                  </h4>
                  <div className="space-y-4">
                    <div className="text-gray-700 font-medium">
                      Question {currentQuestionIndex + 1} of {activeModule.quiz.questions.length}
                    </div>
                    <div className="text-gray-800 text-lg mb-4">
                      {activeModule.quiz.questions[currentQuestionIndex].questionText}
                    </div>
                    <div className="space-y-2">
                      {activeModule.quiz.questions[currentQuestionIndex].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-3 text-left rounded-lg transition-colors ${
                            selectedAnswer === index
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {selectedAnswer !== null && (
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={handleNextQuestion}
                          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                          disabled={currentQuestionIndex === activeModule.quiz.questions.length - 1}
                        >
                          Next Question
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseViewer;