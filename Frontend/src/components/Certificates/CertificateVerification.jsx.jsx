import React, { useState } from "react";

const students = [
  {
    id: 1,
    name: "Alice Smith",
    certificates: [
      {
        id: "CERT-12345",
        title: "Advanced React",
        issueDate: "2025-02-16",
        isValid: true,
        hash: "0xabc123def456",
      },
    ],
  },
  {
    id: 2,
    name: "Bob Johnson",
    certificates: [
      {
        id: "CERT-67890",
        title: "Backend Development",
        issueDate: "2025-01-10",
        isValid: false,
        hash: "0x000000000000",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie Davis",
    certificates: [
      {
        id: "CERT-11223",
        title: "Machine Learning Basics",
        issueDate: "2025-03-05",
        isValid: true,
        hash: "0xdef456ghi789",
      },
    ],
  },
  {
    id: 4,
    name: "David Brown",
    certificates: [
      {
        id: "CERT-33445",
        title: "Cybersecurity Essentials",
        issueDate: "2024-12-25",
        isValid: true,
        hash: "0xghi789jkl012",
      },
    ],
  },
];

const CertificateVerification = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [blockchainExplorer, setBlockchainExplorer] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleVerify = async (certificate) => {
    setLoading(true);
    setVerificationMessage("");
    setBlockchainExplorer(null);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API delay
      if (certificate.isValid) {
        setBlockchainExplorer(`https://polygon-explorer.com/tx/${certificate.hash}`);
        setVerificationMessage("✅ This certificate is verified and securely stored on Polygon Blockchain.");
      } else {
        setVerificationMessage("❌ This certificate is NOT found in the blockchain registry.");
      }
    } catch (error) {
      setVerificationMessage("⚠️ An error occurred while verifying the certificate. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gradient-to-b from-orange-100 to-orange-300 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-orange-700 drop-shadow-md">
        Blockchain-Based Certificate Verification
      </h1>
      <p className="text-center text-gray-700 mt-2 italic">
        All certificates are permanently stored on the Polygon blockchain for security.
      </p>
      
      <div className="mt-8 flex flex-col md:grid md:grid-cols-2 gap-6">
        {/* Student List */}
        <div className="bg-white p-5 shadow-lg rounded-lg border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">Students</h2>
          {students.map((student) => (
            <button
              key={student.id}
              className="block w-full p-3 mb-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all shadow-md"
              onClick={() => setSelectedStudent(student)}
            >
              {student.name}
            </button>
          ))}
        </div>

        {/* Certificate List */}
        <div className="bg-white p-5 shadow-lg rounded-lg border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">Certificates</h2>
          {selectedStudent ? (
            selectedStudent.certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="p-4 border rounded-lg mb-3 bg-gray-50 shadow-sm transition-all hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800">{certificate.title}</h3>
                <p className="text-sm text-gray-600">Issued on: {certificate.issueDate}</p>
                <p className="text-sm text-gray-600">Certificate ID: {certificate.id}</p>
                <p className="text-sm text-gray-500">Blockchain Hash: {certificate.hash}</p>
                <button
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md"
                  onClick={() => handleVerify(certificate)}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify Certificate"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">Select a student to view certificates.</p>
          )}
        </div>
      </div>

      {/* Verification Message */}
      {verificationMessage && (
        <div className="mt-6 p-4 bg-green-100 text-center rounded-lg shadow-md" aria-live="polite">
          <p className="text-green-700 font-semibold">{verificationMessage}</p>
        </div>
      )}

      {/* Blockchain Explorer Link */}
      {blockchainExplorer && (
        <div className="mt-4 text-center">
          <a
            href={blockchainExplorer}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline font-semibold hover:text-orange-800"
          >
            View on Polygon Explorer
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificateVerification;
