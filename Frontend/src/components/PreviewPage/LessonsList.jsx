import React from "react";
import { motion } from "framer-motion";

const LessonCard = ({ title, duration, lessonNumber }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between bg-white p-4 shadow-xl rounded-2xl mb-4 hover:shadow-2xl hover:scale-105 transition-transform ease-in-out duration-300"
    >
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">Lesson {lessonNumber}</p>
      </div>
      <div className="flex items-center space-x-4">
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
          {duration}
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-red-500"
          >
            <path d="M10 15l6-3-6-3v6z" />
            <path
              fillRule="evenodd"
              d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-2 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

const Section = ({ sectionNumber, sectionTitle, lessons }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 border rounded-xl bg-gradient-to-r from-orange-100 to-white shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center mb-4">
        <h1 className="text-5xl font-bold text-orange-500 mr-4">{sectionNumber}</h1>
        <h2 className="text-xl font-semibold text-black-500">{sectionTitle}</h2>
      </div>
      {lessons.map((lesson, index) => (
        <LessonCard
          key={index}
          title={lesson.title}
          duration={lesson.duration}
          lessonNumber={lesson.lessonNumber}
        />
      ))}
    </motion.div>
  );
};

const LessonList = () => {
  const sections = [
    {
      sectionNumber: "01",
      sectionTitle: "Introduction to UI/UX Design",
      lessons: [
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
      ],
    },
    {
      sectionNumber: "02",
      sectionTitle: "User Research and Analysis",
      lessons: [
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
      ],
    },
    {
      sectionNumber: "03",
      sectionTitle: "Introduction to UI/UX Design",
      lessons: [
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
      ],
    },
    {
      sectionNumber: "04",
      sectionTitle: "User Research and Analysis",
      lessons: [
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
          lessonNumber: "01",
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto p-6">
      {sections.map((section, index) => (
        <Section
          key={index}
          sectionNumber={section.sectionNumber}
          sectionTitle={section.sectionTitle}
          lessons={section.lessons}
        />
      ))}
    </div>
  );
};

export default LessonList;
