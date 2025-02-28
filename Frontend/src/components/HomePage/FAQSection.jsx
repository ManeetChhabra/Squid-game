import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const faqItems = [
    {
      question: 'Can I enroll in multiple courses at once?',
      answer:
        'Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.',
    },
    {
      question: 'What kind of support can I expect from instructors?',
      answer:
        'Our instructors are dedicated to providing personalized support and guidance throughout your learning journey. They are available to answer your questions, offer feedback, and help you overcome any challenges you may face.',
    },
    {
      question: 'Are the courses self-paced or do they have specific start and end dates?',
      answer:
        'The courses are designed with flexibility in mind. While some have set start and end dates, many of our offerings are self-paced, allowing you to learn at your own convenience.',
    },
    {
      question: 'Are there any prerequisites for the courses?',
      answer:
        'The course prerequisites vary depending on the subject matter and difficulty level. We recommend reviewing the individual course details to ensure you meet the necessary requirements before enrolling.',
    },
    {
      question: 'Can I download the course materials for offline access?',
      answer:
        'Yes, you can download the course materials for offline access. This allows you to study and review the content even when you don\'t have an internet connection.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 mb-8">
        Still you have any questions? Contact our Team via support@skillbridge.com
      </p>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              activeIndex === index ? 'border-orange-500' : 'border-gray-300'
            } border`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between px-6 py-4 focus:outline-none"
            >
              <h3 className="text-lg font-medium text-gray-800">
                {item.question}
              </h3>
              <svg
                className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 border-t border-gray-300">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <a href="#" className="text-orange-500 hover:text-orange-600">
          See All FAQ's
        </a>
      </div>
    </div>
  );
};

export default FAQSection;