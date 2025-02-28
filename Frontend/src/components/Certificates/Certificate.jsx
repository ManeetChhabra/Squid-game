import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Certificate = ({ userName, courseTitle, issueDate, geminiApiKey }) => {
  const certificateRef = useRef(null);
  
  // State for fetched user name (simulate backend fetch if userName prop not provided)
  const [fetchedUserName, setFetchedUserName] = useState(userName || "");
  
  useEffect(() => {
    if (!userName) {
      // Simulate backend API call to fetch the user's name
      setTimeout(() => {
        setFetchedUserName("John Doe"); // Replace with actual API call
      }, 1000);
    }
  }, [userName]);
  
  const finalUserName = fetchedUserName || "Loading...";

  // Customization states
  const [theme, setTheme] = useState("classic");
  const [customMessage, setCustomMessage] = useState(
    "Congratulations on your remarkable achievement!"
  );
  const [useAIBg, setUseAIBg] = useState(false);
  const [bgImage, setBgImage] = useState("");

  // Function to simulate AI-generated background image using a Gemini API key
  const fetchAIBgImage = () => {
    if (geminiApiKey) {
      // Simulate an API call to fetch an AI-generated background image
      setTimeout(() => {
        setBgImage("https://your-ai-generated-background.com/ai-image.png");
      }, 1000);
    }
  };

  useEffect(() => {
    if (useAIBg) {
      fetchAIBgImage();
    } else {
      setBgImage("");
    }
  }, [useAIBg]);

  // Function to download certificate as PDF
  const handleDownloadPDF = () => {
    html2canvas(certificateRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 10, 10, 280, 200);
      pdf.save(`${finalUserName}_certificate.pdf`);
    });
  };

  // Function to print the certificate
  const handlePrint = () => {
    window.print();
  };

  // Function to simulate sending the certificate via email
  const handleSendEmail = () => {
    const email = prompt("Enter the email address to send the certificate:");
    if (email) {
      // Simulate an API call for sending email
      setTimeout(() => {
        alert(`Certificate sent to ${email}!`);
      }, 1000);
    }
  };

  // Function to copy the certificate link to clipboard
  const handleCopyLink = () => {
    const certificateLink = "https://your-website.com/certificate"; // Replace with dynamic link if needed
    navigator.clipboard.writeText(certificateLink).then(() => {
      alert("Certificate link copied to clipboard!");
    });
  };

  // Confetti animation to celebrate achievement
  useEffect(() => {
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "absolute";
      confetti.style.width = "8px";
      confetti.style.height = "8px";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.opacity = "0";
      confetti.style.transform = "translateY(-50px) rotate(45deg)";
      confetti.style.transition = "opacity 1s ease-out, transform 1s ease-out";
      confettiContainer.appendChild(confetti);
      setTimeout(() => {
        confetti.style.opacity = "1";
        confetti.style.transform = "translateY(0px) rotate(45deg)";
      }, 100);
      setTimeout(() => {
        confetti.style.opacity = "0";
      }, 2000);
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 3000);
  }, []);

  // Define theme styles
  const themeStyles = {
    classic: "bg-white border-orange-500",
    modern: "bg-gradient-to-r from-orange-100 to-white border-orange-600",
    elegant: "bg-orange-50 border-4 border-orange-700",
  };

  const appliedTheme = themeStyles[theme] || themeStyles.classic;

  return (
    <div
      className="flex flex-col items-center p-6 mt-24"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF5E1, #FFE8CC)",
      }}
    >
      <h1 className="text-5xl font-extrabold text-orange-600 mb-8">
        Achievement Certificate
      </h1>

      {/* Customization Panel */}
      <div className="mb-8 p-4 bg-white rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Customize Your Certificate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="elegant">Elegant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Custom Message
            </label>
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600"
                checked={useAIBg}
                onChange={(e) => setUseAIBg(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">
                Use AI Generated Background
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Certificate Preview */}
      <div
        ref={certificateRef}
        className={`relative w-[850px] h-[550px] ${appliedTheme} rounded-lg shadow-2xl border-8 p-10 overflow-hidden`}
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Semi-transparent overlay for readability */}
        <div className="absolute inset-0 bg-white bg-opacity-70"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold text-orange-600 mb-4">
            Certificate of Completion
          </h2>
          <p className="text-xl text-gray-700 mb-2">
            This certificate is proudly presented to
          </p>
          <h3 className="text-3xl font-semibold text-orange-700 my-3">
            {finalUserName}
          </h3>
          <p className="text-xl text-gray-700 mb-2">
            for successfully completing the course
          </p>
          <h4 className="text-2xl font-bold text-orange-600 my-3">
            {courseTitle}
          </h4>
          <p className="text-lg text-gray-600 mt-4">Issued on: {issueDate}</p>
          <p className="text-lg text-gray-800 mt-2 italic">
            {customMessage}
          </p>
          <div className="mt-8 flex justify-around items-center px-10">
            <div className="flex flex-col items-center">
              <img
                src="https://your-cloud-image-url.com/signature.png"
                alt="Authorized Signature"
                className="h-16 mb-2"
              />
              <span className="text-lg font-semibold text-orange-600">
                Authorized Signature
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-orange-700">
                © 2025 SkillSensei
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-700 transition"
        >
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-700 transition"
        >
          Print Certificate
        </button>
        <button
          onClick={handleSendEmail}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Send via Email
        </button>
        <button
          onClick={handleCopyLink}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition"
        >
          Copy Certificate Link
        </button>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=https://your-website.com/certificate&title=Certificate%20of%20Completion%20for%20${courseTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-700 transition"
        >
          Share on LinkedIn
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=https://your-website.com/certificate&text=Certificate%20of%20Completion%20for%20${courseTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-700 transition"
        >
          Share on Twitter
        </a>
      </div>
    </div>
  );
};

export default Certificate;
