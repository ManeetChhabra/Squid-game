import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          phone: "",
          summary: "",
          experience: "",
          education: "",
          skills: "",
          jobTitle: "",
          projectName: "",
          projectDescription: "",
        };
  });

  const [sectionLoading, setSectionLoading] = useState(null);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Helper function to remove extra headings or repeated labels
  const cleanAIResponse = (text) => {
    if (!text) return "";
    return text
      .replace(/(summary|experience|education|skills|project(?:s)?)[\s]*:/gi, "")
      .replace(/\n+/g, "\n")
      .replace(/\*+/g, "")
      .trim();
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const generateAIContent = async (section) => {
    setSectionLoading(section);
    try {
      const apiKey = process.env.REACT_APP_AI_API_KEY || "AIzaSyAtV8nuqqKXDNbJ3yahxqGfzWxMBB-RmvU";

      let prompt = `Generate a concise, professional ${section} for a resume of a ${resumeData.jobTitle}.
        Use the following details: ${JSON.stringify(resumeData)}.
        IMPORTANT: Return only the text for the ${section} itself, with no headings or extra formatting.`;

      if (section === "projectDescription") {
        prompt = `Generate a concise, professional project description for a project named "${resumeData.projectName}" for a ${resumeData.jobTitle}.
          Use the following details: ${JSON.stringify(resumeData)}.
          IMPORTANT: Return only the project description text, with no headings or extra formatting.`;
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );

      const rawAIText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleanedText = cleanAIResponse(rawAIText);

      setResumeData((prevData) => ({
        ...prevData,
        [section]: cleanedText,
      }));
    } catch (error) {
      console.error(`AI Generation Error for ${section}:`, error);
    } finally {
      setSectionLoading(null);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 20;
    const rightMargin = 20;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    let yPos = 20;

    const centerText = (text, y, options = {}) => {
      doc.text(text, pageWidth / 2, y, { align: "center", ...options });
    };

    // -- Header Section --
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    centerText(resumeData.name || "Your Name", yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    centerText(`Email: ${resumeData.email || ""}`, yPos);
    yPos += 7;
    centerText(`Phone: ${resumeData.phone || ""}`, yPos);
    yPos += 7;
    centerText(`Job Title: ${resumeData.jobTitle || ""}`, yPos);
    yPos += 10;

    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPos, pageWidth - rightMargin, yPos);
    yPos += 10;

    const renderSection = (heading, text) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(heading, leftMargin, yPos);
      yPos += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(text || "", contentWidth);
      doc.text(lines, leftMargin, yPos);
      yPos += lines.length * 7 + 4;
    };

    // -- Resume Sections --
    if (resumeData.summary) {
      renderSection("Summary", resumeData.summary);
    }
    if (resumeData.experience) {
      renderSection("Experience", resumeData.experience);
    }
    if (resumeData.education) {
      renderSection("Education", resumeData.education);
    }
    if (resumeData.skills) {
      renderSection("Skills", resumeData.skills);
    }

    // Projects
    if (resumeData.projectName || resumeData.projectDescription) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Projects", leftMargin, yPos);
      yPos += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      if (resumeData.projectName) {
        doc.text(`Project: ${resumeData.projectName}`, leftMargin, yPos);
        yPos += 7;
      }

      const lines = doc.splitTextToSize(
        resumeData.projectDescription || "",
        contentWidth
      );
      doc.text(lines, leftMargin, yPos);
      yPos += lines.length * 7 + 4;
    }

    doc.save("resume.pdf");
  };

  return (
    // Outer container: orange gradient background
    <div className="min-h-screen bg-gradient-to-r from-orange-200 via-orange-300 to-orange-100 flex items-center justify-center p-4">
      {/* Two-column container: Left = Form, Right = Image */}
      <div className="flex flex-row w-full max-w-5xl rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
        
        {/* Left Column: Form */}
        <div className="w-1/2 bg-white p-8">
          <h2 className="text-3xl text-orange-600 font-bold mb-6 text-center">
            AI-Powered Resume Builder
          </h2>

          {/* Basic Fields */}
          <input
            className="w-full p-3 border border-orange-300 rounded mb-3 focus:ring-orange-500 focus:border-orange-500 transition"
            name="name"
            placeholder="Full Name"
            value={resumeData.name}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border border-orange-300 rounded mb-3 focus:ring-orange-500 focus:border-orange-500 transition"
            name="email"
            placeholder="Email"
            value={resumeData.email}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border border-orange-300 rounded mb-3 focus:ring-orange-500 focus:border-orange-500 transition"
            name="phone"
            placeholder="Phone Number"
            value={resumeData.phone}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border border-orange-300 rounded mb-3 focus:ring-orange-500 focus:border-orange-500 transition"
            name="jobTitle"
            placeholder="Job Title"
            value={resumeData.jobTitle}
            onChange={handleChange}
          />

          {/* Main Resume Sections */}
          {["summary", "experience", "education", "skills"].map((section) => (
            <div key={section} className="mb-4">
              <textarea
                className="w-full p-3 border border-orange-300 rounded focus:ring-orange-500 focus:border-orange-500 transition"
                name={section}
                placeholder={`Enter your ${section}`}
                value={resumeData[section]}
                onChange={handleChange}
              />
              <button
                onClick={() => generateAIContent(section)}
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded w-full font-semibold transition-transform transform hover:scale-105"
                disabled={sectionLoading === section}
              >
                {sectionLoading === section
                  ? "Generating..."
                  : `Generate ${section} with AI`}
              </button>
            </div>
          ))}

          {/* Projects Section */}
          <div className="mb-4">
            <input
              className="w-full p-3 border border-orange-300 rounded mb-3 focus:ring-orange-500 focus:border-orange-500 transition"
              name="projectName"
              placeholder="Project Name"
              value={resumeData.projectName}
              onChange={handleChange}
            />
            <textarea
              className="w-full p-3 border border-orange-300 rounded focus:ring-orange-500 focus:border-orange-500 transition"
              name="projectDescription"
              placeholder="Project Description"
              value={resumeData.projectDescription}
              onChange={handleChange}
            />
            <button
              onClick={() => generateAIContent("projectDescription")}
              className="mt-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded w-full font-semibold transition-transform transform hover:scale-105"
              disabled={sectionLoading === "projectDescription"}
            >
              {sectionLoading === "projectDescription"
                ? "Generating..."
                : "Generate Project Description with AI"}
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={generatePDF}
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded w-full font-bold transition-transform transform hover:scale-105"
          >
            Download PDF
          </button>
        </div>

        {/* Right Column: Image Container (same height as form) */}
        <div className="w-1/2 bg-orange-50 flex items-center justify-center">
          {/* Replace with your desired image */}
          <img
            src="https://img.freepik.com/premium-vector/friendly-smiling-man-waving-hand-saying-hello-illustration_598748-235.jpg?w=826"
            alt="Illustration"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
