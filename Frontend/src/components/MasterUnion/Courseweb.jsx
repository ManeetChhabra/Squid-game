import React, { useState, useEffect } from 'react';

const Courseweb = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Masters' Union Courses</h1>
      <ul className="list-disc pl-6">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <li key={index} className="text-lg mb-2">{course}</li>
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </ul>
    </div>
  );
};

export default Courseweb;
