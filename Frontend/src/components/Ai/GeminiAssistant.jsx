import { useState } from "react";
import { motion } from "framer-motion";

const GeminiAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [notes, setNotes] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setMessages([...newMessages, { sender: "bot", text: data.response || `Error: ${data.error}` }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: `Error: ${error.message}` }]);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-black text-white">
   <div className="flex items-center p-4 bg-gray-800 border-b border-gray-700">
           <div className="w-8 h-8 rounded-full bg-gray-600 mr-3"><img src="https://64.media.tumblr.com/635df438d0df43741f7c6d70cf81f0ae/f57895b6f1860a4d-f7/s250x250_c1/ee95620e62696d8abbdd0ecef785578d1b480758.jpg" className="rounded-full" alt="" /></div>
           <div>
             <h1 className="text-white font-medium">My Chatbot</h1>
             <p className="text-orange-500 text-sm">Online</p>
           </div>
         </div>
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">

        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[75%] rounded-lg p-3 mb-2 ${
              msg.sender === "user" ? "bg-orange-600 self-end" : "bg-gray-800 self-start"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center p-4 border-t border-gray-700">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-900 text-white p-3 rounded-lg outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GeminiAssistant;
  