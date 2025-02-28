import React, { useState } from "react";
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback && rating) {
      console.log({ feedback, rating });
      setSubmitted(true);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-orange-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 border-2 border-orange-500 transform hover:scale-105 transition-all duration-300"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-4">Feedback Form</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-lg font-medium text-gray-700">Rate Your Session:</label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  className={`w-12 h-12 text-xl rounded-full transition-all duration-300 ${rating === star ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setRating(star)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {star}
                </motion.button>
              ))}
            </div>

            <label className="block text-lg font-medium text-gray-700">Your Feedback:</label>
            <motion.textarea 
              className="w-full border-2 border-orange-400 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              rows="4"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
            />
            
            <motion.button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Feedback
            </motion.button>
          </form>
        ) : (
          <motion.div 
            className="text-center text-lg font-semibold text-orange-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            Thank you for your feedback!
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm;
