import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../axios.config.js";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [currentCourseTitle, setCurrentCourseTitle] = useState("");
  const [currentModule, setCurrentModule] = useState(null);
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchModuleDetails = async () => {
      if (courseId && moduleId) {
        try {
          const response = await api.get(`/courses/${courseId}/${moduleId}`);
          setCurrentModule(response.data);
          setIsPlayerOpen(true);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    if (courseId && moduleId) {
      fetchModuleDetails();
    }
  }, [courseId, moduleId]);

  const handleModuleClick = (courseId, moduleId, courseTitle) => {
    setCurrentCourseTitle(courseTitle);
    navigate(`/courses/${courseId}/modules/${moduleId}`);
  };

  const closePlayer = () => {
    setIsPlayerOpen(false);
    setCurrentModule(null);
    setCurrentCourseTitle("");
    navigate(`/courses`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Fetching Courses...</div>
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
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Online Courses on Design and Development
          </h1>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Welcome to our online course page, where you can enhance your skills
            in design and development. Choose from our carefully curated
            selection of courses designed to provide you with comprehensive
            knowledge and practical experience.
          </p>
        </div>

        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-lg overflow-hidden mb-12"
          >
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {course.courseTitle}
                </h2>
              </div>
              <p className="text-gray-600 mt-4">{course.description}</p>
            </div>

            <div className="px-6 pb-6">
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-full rounded-lg"
              />
            </div>

            <div className="flex justify-between items-center px-6 py-4 border-t text-gray-600">
              <span>Duration: {course.modules?.length || 0} Modules</span>
              <span>Level: {course.difficulty}</span>
              <span>Price: ${course.price}</span>
            </div>

            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Modules
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {course.modules?.map((module, index) => (
                  <button
                    key={index}
                    onClick={() => handleModuleClick(course._id, module._id, course.courseTitle)}
                    className="bg-white text-center shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    <h4 className="text-lg font-bold text-blue-600">
                      0{index + 1}
                    </h4>
                    <p className="text-gray-600 text-sm">{module.moduleTitle}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPlayerOpen && currentModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {currentCourseTitle} - {currentModule.moduleTitle}
            </h2>
            
            {currentModule.lecture && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Lecture</h3>
                <video
                  src={currentModule.lecture}
                  controls
                  className="w-full rounded-lg"
                />
              </div>
            )}
            
            {currentModule.quiz && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Quiz</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{currentModule.quiz.question}</p>
                </div>
              </div>
            )}

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={closePlayer}
            >
              Close Module
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;