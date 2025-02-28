import React, { useState } from "react";
import axios from "axios";

const CertificateGen = () => {
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [recipient, setRecipient] = useState("");
  const [certificates, setCertificates] = useState([]);

  const issueCertificate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/issueCertificate", {
        recipient,
        studentName,
        courseName,
        ipfsHash,
      });
      alert("Certificate issued! Transaction Hash: " + response.data.transactionHash);
    } catch (error) {
      console.error(error);
      alert("Error issuing certificate");
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getCertificates/${recipient}`);
      setCertificates(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching certificates");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Certificate Manager</h1>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Recipient Address"
          className="border p-2 w-full"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student Name"
          className="border p-2 w-full mt-2"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Name"
          className="border p-2 w-full mt-2"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="IPFS Hash"
          className="border p-2 w-full mt-2"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 w-full hover:bg-blue-600"
          onClick={issueCertificate}
        >
          Issue Certificate
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-2 w-full hover:bg-green-600"
          onClick={fetchCertificates}
        >
          Get Certificates
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Certificates:</h2>
        {certificates.length === 0 ? (
          <p className="text-gray-500">No certificates found.</p>
        ) : (
          certificates.map((cert, index) => (
            <div key={index} className="border p-2 mt-2 rounded-md shadow-md">
              <p><strong>Student Name:</strong> {cert.studentName}</p>
              <p><strong>Course Name:</strong> {cert.courseName}</p>
              <p><strong>Issue Date:</strong> {new Date(cert.issueDate * 1000).toLocaleString()}</p>
              <p><strong>IPFS Hash:</strong> {cert.ipfsHash}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CertificateGen;