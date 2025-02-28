import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

const ResumeBuilder = () => {
  // Your API key is hardcoded here
  const GEMINI_API_KEY = "AIzaSyAQOWGKd2XS-fyNWrCWfDWNCqUGwvo03Fw"; // Replace with your actual API key
  
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
  const [errorMessage, setErrorMessage] = useState("");
  const [pageWarning, setPageWarning] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    // Check if content would fit on one page whenever resumeData changes
    checkContentFit();
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

  // Function to delay execution (for retry mechanism)
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Function to make API call with retry logic
  const makeAPICall = async (prompt, retries = 3, initialDelay = 1000) => {
    let currentDelay = initialDelay;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
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
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        
        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } catch (error) {
        // If this is our last retry, throw the error
        if (attempt === retries) {
          throw error;
        }
        
        // If rate limited (429), wait before retrying
        if (error.response && error.response.status === 429) {
          console.log(`Rate limited. Retrying in ${currentDelay}ms...`);
          await delay(currentDelay);
          // Exponential backoff - double the delay for next retry
          currentDelay *= 2;
        } else {
          // If not a rate limit error, throw immediately
          throw error;
        }
      }
    }
  };

  const generateAIContent = async (section) => {
    setSectionLoading(section);
    setErrorMessage("");
    
    try {
      // Modified prompts to emphasize brevity for single-page resume
      let prompt = `Generate a VERY CONCISE, professional ${section} for a single-page resume of a ${resumeData.jobTitle || "professional"}.
        Use the following details: ${JSON.stringify(resumeData)}.
        IMPORTANT: Keep it extremely brief (2-4 lines max) to fit on a single page resume.
        Return only the text for the ${section} itself, with no headings or extra formatting.`;

      if (section === "projectDescription") {
        prompt = `Generate a VERY CONCISE (2-3 lines max) professional project description for a project named "${resumeData.projectName || "Unnamed Project"}" for a ${resumeData.jobTitle || "professional"}'s single-page resume.
          Use the following details: ${JSON.stringify(resumeData)}.
          IMPORTANT: Keep it extremely brief to fit on a single page resume.
          Return only the project description text, with no headings or extra formatting.`;
      } else if (section === "experience") {
        prompt = `Generate a VERY CONCISE professional experience section for a single-page resume of a ${resumeData.jobTitle || "professional"}.
          Use the following details: ${JSON.stringify(resumeData)}.
          IMPORTANT: Keep it extremely brief (max 3-5 bullet points) and focused on the most relevant experience.
          Return only the text for the experience section, with no headings or extra formatting.`;
      } else if (section === "skills") {
        prompt = `Generate a VERY CONCISE list of 5-8 key skills for a single-page resume of a ${resumeData.jobTitle || "professional"}.
          Use the following details: ${JSON.stringify(resumeData)}.
          IMPORTANT: List only the most relevant skills separated by commas.
          Return only the skills text, with no headings or extra formatting.`;
      }

      const rawAIText = await makeAPICall(prompt);
      const cleanedText = cleanAIResponse(rawAIText);

      setResumeData((prevData) => ({
        ...prevData,
        [section]: cleanedText,
      }));
    } catch (error) {
      console.error(`AI Generation Error for ${section}:`, error);
      
      let errorMsg = "An error occurred. Please try again later.";
      
      if (error.response) {
        if (error.response.status === 429) {
          errorMsg = "Rate limit exceeded. Please wait a moment and try again.";
        } else if (error.response.status === 400) {
          errorMsg = "Invalid request. Please check your inputs.";
        } else if (error.response.status === 401 || error.response.status === 403) {
          errorMsg = "API key error. Please check your API key.";
        }
      }
      
      setErrorMessage(errorMsg);
    } finally {
      setSectionLoading(null);
    }
  };

  // Function to estimate if content fits on a single page
  const checkContentFit = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftMargin = 20;
    const rightMargin = 20;
    const contentWidth = doc.internal.pageSize.getWidth() - leftMargin - rightMargin;
    let yPos = 20;

    // Header section height (estimated)
    doc.setFontSize(24);
    yPos += 10; // Name
    doc.setFontSize(12);
    yPos += 7; // Email
    yPos += 7; // Phone
    yPos += 7; // Job Title
    yPos += 10; // Spacing before line
    yPos += 10; // Line and spacing after

    // Function to estimate section height
    const estimateSectionHeight = (text) => {
      if (!text || text.trim() === "") return 0;
      
      const headerHeight = 8; // Section header height
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(text, contentWidth);
      const contentHeight = lines.length * 7 + 4; // Text height + padding
      
      return headerHeight + contentHeight;
    };

    // Calculate sections heights
    yPos += estimateSectionHeight(resumeData.summary);
    yPos += estimateSectionHeight(resumeData.experience);
    yPos += estimateSectionHeight(resumeData.education);
    yPos += estimateSectionHeight(resumeData.skills);

    // Projects section
    if (resumeData.projectName || resumeData.projectDescription) {
      yPos += 8; // Projects header
      yPos += resumeData.projectName ? 7 : 0; // Project name
      yPos += estimateSectionHeight(resumeData.projectDescription);
    }

    // Set warning if content exceeds page height
    setPageWarning(yPos > pageHeight - 20); // 20px margin at bottom
    
    return yPos <= pageHeight - 20;
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
      if (!text || text.trim() === "") return;
      
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
    renderSection("Summary", resumeData.summary);
    renderSection("Experience", resumeData.experience);
    renderSection("Education", resumeData.education);
    renderSection("Skills", resumeData.skills);

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

      if (resumeData.projectDescription) {
        const lines = doc.splitTextToSize(resumeData.projectDescription, contentWidth);
        doc.text(lines, leftMargin, yPos);
        yPos += lines.length * 7 + 4;
      }
    }

    doc.save("resume.pdf");
  };

  // Function to handle manual input (when AI generation fails)
  const handleManualInput = (section) => {
    const exampleText = {
      summary: "Results-driven professional with 5 years of experience in software development, specializing in web applications.",
      experience: "Senior Developer, XYZ Corp (2018-Present)\n- Led development team for multiple client projects\n- Increased deployment efficiency by 40%",
      education: "Bachelor of Science in Computer Science, University of Technology (2015-2019)",
      skills: "JavaScript, React, Node.js, Python, AWS, Docker",
      projectDescription: "Created a responsive web app using React.js that improved user engagement by 35%."
    };
    
    setResumeData(prev => ({
      ...prev,
      [section]: exampleText[section] || "Example text for " + section
    }));
  };

  return (
    // Outer container: orange gradient background
    <div className="min-h-screen bg-gradient-to-r from-orange-200 via-orange-300 to-orange-100 flex items-center justify-center p-4">
      {/* Two-column container: Left = Form, Right = Image */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl">
        
        {/* Left Column: Form */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <h2 className="text-3xl text-orange-600 font-bold mb-6 text-center">
            Single-Page Resume Builder
          </h2>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorMessage}
              <p className="mt-2 text-sm">Try using example text instead or wait a few minutes and try again.</p>
            </div>
          )}
          
          {pageWarning && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              <strong>Warning:</strong> Your content may exceed one page. Consider shortening some sections.
            </div>
          )}

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
              <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                {section}
                {section === "summary" && <span className="text-xs text-gray-500 ml-2">(2-3 lines)</span>}
                {section === "experience" && <span className="text-xs text-gray-500 ml-2">(3-5 bullet points)</span>}
                {section === "education" && <span className="text-xs text-gray-500 ml-2">(1-2 lines)</span>}
                {section === "skills" && <span className="text-xs text-gray-500 ml-2">(5-8 key skills)</span>}
              </label>
              <textarea
                className="w-full p-3 border border-orange-300 rounded focus:ring-orange-500 focus:border-orange-500 transition"
                name={section}
                placeholder={`Enter your ${section} (keep concise for single-page)`}
                value={resumeData[section]}
                onChange={handleChange}
                rows={section === "experience" ? 4 : 3}
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => generateAIContent(section)}
                  className="mt-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded flex-grow font-semibold transition-transform transform hover:scale-105 disabled:bg-orange-300 disabled:cursor-not-allowed"
                  disabled={sectionLoading === section}
                >
                  {sectionLoading === section
                    ? "Generating..."
                    : `Generate with AI`}
                </button>
                <button
                  onClick={() => handleManualInput(section)}
                  className="mt-2 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded w-1/3 font-semibold transition-transform transform hover:scale-105"
                >
                  Example
                </button>
              </div>
            </div>
          ))}

          {/* Projects Section */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project <span className="text-xs text-gray-500">(optional - 2-3 lines)</span>
            </label>
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
              placeholder="Project Description (keep concise for single-page)"
              value={resumeData.projectDescription}
              onChange={handleChange}
              rows={3}
            />
            <div className="flex space-x-2">
              <button
                onClick={() => generateAIContent("projectDescription")}
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded flex-grow font-semibold transition-transform transform hover:scale-105 disabled:bg-orange-300 disabled:cursor-not-allowed"
                disabled={sectionLoading === "projectDescription"}
              >
                {sectionLoading === "projectDescription"
                  ? "Generating..."
                  : "Generate with AI"}
              </button>
              <button
                onClick={() => handleManualInput("projectDescription")}
                className="mt-2 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded w-1/3 font-semibold transition-transform transform hover:scale-105"
              >
                Example
              </button>
            </div>
          </div>

          {/* Single Page Notice */}
          <div className="text-sm text-gray-600 mb-4 italic">
            All content will be formatted to fit on a single page. Keep sections concise.
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
        <div className="hidden md:block md:w-1/2 bg-orange-50 flex items-center justify-center">
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