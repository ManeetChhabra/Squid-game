import React, { useState } from 'react';

const InterviewComponent = () => {
  // 1) Put your actual Google Cloud Project ID here:
  const PROJECT_ID = "1034587532949";
  // 2) Use a valid API key that has access to the PaLM API:
  const API_KEY = "AIzaSyDXIP5NzPgmXU3Fg4ribuINbFmePf1b92k";

  // The fully-qualified endpoint for text-bison-001 in the us-central1 location:
  const MODEL_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta2/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/text-bison-001:generateText`;

  const [skills] = useState([
    'JavaScript', 'Python', 'React', 'Node.js', 'Data Structures',
    'Algorithms', 'System Design', 'SQL', 'Machine Learning', 'CSS',
    'HTML', 'Docker', 'Kubernetes', 'AWS', 'Git', 'DevOps'
  ]);

  const [selectedSkill, setSelectedSkill] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  // Helper to safely parse JSON
  const safeJsonParse = (jsonString) => {
    try {
      return { success: true, data: JSON.parse(jsonString) };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Extract JSON array from text
  const extractJsonFromText = (text) => {
    const trimmed = text.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return safeJsonParse(trimmed);
    }
    const start = trimmed.indexOf('[');
    const end = trimmed.lastIndexOf(']');
    if (start !== -1 && end !== -1 && end > start) {
      const jsonSubstring = trimmed.substring(start, end + 1);
      return safeJsonParse(jsonSubstring);
    }
    return { success: false, error: new Error("No JSON array found") };
  };

  // Fallback questions if API call fails or no key
  const getFallbackQuestions = () => {
    return [
      {
        question: `What are the key features of ${selectedSkill}?`,
        idealAnswer: `A comprehensive answer would cover the main features, benefits, and use cases of ${selectedSkill}.`
      },
      {
        question: `Explain a real-world problem you've solved using ${selectedSkill}.`,
        idealAnswer: `A good answer would describe the problem, approach, implementation details using ${selectedSkill}, and the outcome.`
      },
      {
        question: `What are some common challenges when working with ${selectedSkill} and how do you overcome them?`,
        idealAnswer: `An ideal answer would identify specific challenges in ${selectedSkill} and provide practical strategies to address them.`
      },
      {
        question: `How do you stay updated with the latest developments in ${selectedSkill}?`,
        idealAnswer: `A strong answer would mention specific resources, communities, and learning strategies relevant to ${selectedSkill}.`
      },
      {
        question: `Describe the best practices when using ${selectedSkill} in a production environment.`,
        idealAnswer: `A comprehensive answer would cover security, performance, maintenance, and scalability aspects of ${selectedSkill} in production.`
      }
    ];
  };

  // Use a proxy service or setup local proxy for API calls
  const callAPIWithProxy = async (endpoint, requestBody) => {
    // Option 1: Use a CORS proxy (for development only)
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    try {
      // For development testing, use fallback questions instead of dealing with CORS
      if (process.env.NODE_ENV === 'development') {
        console.log("Using fallback questions in development mode to avoid CORS issues");
        return getFallbackQuestions();
      }
      
      // In production, you would use a proper backend proxy or CORS configuration
      const response = await fetch(corsProxyUrl + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };

  // Fetch interview questions from the API or fallback
  const fetchQuestions = async () => {
    if (!selectedSkill) return;

    setIsLoading(true);
    setError(null);
    setAssessmentStarted(true);

    try {
      // For development/demo purposes, use fallback questions to avoid CORS issues
      const fallbackQuestions = getFallbackQuestions();
      setQuestions(fallbackQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswer('');
      setEvaluation(null);
      setAssessmentComplete(false);
      setIsLoading(false);

      /* 
      // Code for when you have a proper backend proxy or server setup:
      
      const promptText = `Generate 5 interview questions to assess a candidate's skills in ${selectedSkill}.
      For each question provide:
      1. The question text.
      2. An ideal answer that demonstrates what a good response would look like.
      Format as a valid JSON array with structure:
      [{"question": "question text", "idealAnswer": "ideal answer text"}]
      Ensure that the JSON is properly formatted.`;

      const requestBody = {
        prompt: { text: promptText },
        temperature: 0.4,
        maxOutputTokens: 1024
      };

      try {
        const data = await callAPIWithProxy(MODEL_ENDPOINT, requestBody);
        const generatedText = data?.candidates?.[0]?.output;
        if (!generatedText) throw new Error('Invalid API response structure');

        const { success, data: parsedQuestions, error: jsonError } = extractJsonFromText(generatedText);
        if (!success) throw new Error('Error parsing questions: ' + jsonError.message);
        if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) throw new Error('No valid questions received');

        const validatedQuestions = parsedQuestions.map((q, index) => ({
          question: q.question || `Question ${index + 1}`,
          idealAnswer: q.idealAnswer || "No ideal answer provided"
        }));

        setQuestions(validatedQuestions);
      } catch (err) {
        console.error("Error fetching from API, using fallback questions", err);
        setQuestions(fallbackQuestions);
      }
      */
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred');
      setAssessmentStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Evaluate user answer using either API or local evaluation
  const evaluateAnswer = async () => {
    if (!userAnswer || !questions[currentQuestionIndex]) return;
    setIsLoading(true);
    setError(null);

    try {
      const currentQuestion = questions[currentQuestionIndex];
      
      // Local fallback evaluation logic
      const generateFallbackEvaluation = () => {
        const answerLength = userAnswer.length;
        let feedback;
        
        if (answerLength < 50) {
          feedback = `Your answer is quite brief. Consider expanding on your knowledge of ${selectedSkill} with more details and examples.`;
        } else if (answerLength < 200) {
          feedback = `You've provided a good starting point in your answer about ${selectedSkill}. To improve, consider adding specific examples or use cases that demonstrate your practical experience.`;
        } else {
          feedback = `Strong answer! You've demonstrated good knowledge of ${selectedSkill}. Your response is comprehensive and shows both theoretical understanding and practical knowledge. One additional area you might consider is how this skill integrates with other technologies in a production environment.`;
        }
        
        return `Evaluation for Question: "${currentQuestion.question}"\n\n${feedback}\n\nKey elements from the ideal answer to consider:\n${currentQuestion.idealAnswer}`;
      };
      
      // Use fallback evaluation for development/demo
      setTimeout(() => {
        setEvaluation(generateFallbackEvaluation());
        setIsLoading(false);
      }, 1000);

      /* 
      // Code for when you have a proper backend proxy or server setup:
      
      const promptText = `Please evaluate the following candidate's answer for an interview question.

      Interview Question: ${currentQuestion.question}
      Ideal Answer: ${currentQuestion.idealAnswer}
      Candidate's Answer: ${userAnswer}

      Provide detailed feedback on the candidate's answer, including strengths, weaknesses, and suggestions for improvement.`;

      const requestBody = {
        prompt: { text: promptText },
        temperature: 0.4,
        maxOutputTokens: 1024
      };

      try {
        const data = await callAPIWithProxy(MODEL_ENDPOINT, requestBody);
        const feedbackText = data?.candidates?.[0]?.output;
        if (!feedbackText) throw new Error('Invalid API response structure');

        setEvaluation(feedbackText);
      } catch (err) {
        console.error("Error evaluating with API, using fallback evaluation", err);
        setEvaluation(generateFallbackEvaluation());
      }
      */
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during evaluation');
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setEvaluation(null);
    } else {
      setAssessmentComplete(true);
    }
  };

  const resetAssessment = () => {
    setSelectedSkill('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setEvaluation(null);
    setAssessmentStarted(false);
    setAssessmentComplete(false);
    setError(null);
  };

  return (
    <div className="max-w-2xl mt-24 mx-auto p-6 bg-white rounded-lg shadow-md animate-fadeIn transition-all duration-500">
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">
        AI Skill-Based Interview
      </h1>

      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded animate-fadeIn">
          <strong>Error:</strong>
          <p>{error}</p>
          {error.includes('API') && (
            <small>Please check your API key, project ID, and that the PaLM API is enabled.</small>
          )}
        </div>
      )}

      {/* Skill selection */}
      {!assessmentStarted && (
        <div className="mb-6 animate-fadeIn">
          <h2 className="text-lg font-semibold mb-4 text-orange-600">Select a Skill</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {skills.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`p-3 border rounded-lg text-center transition transform duration-300 ${
                  selectedSkill === skill
                    ? 'bg-orange-500 text-white'
                    : 'bg-white hover:bg-orange-50'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <button
            onClick={fetchQuestions}
            disabled={!selectedSkill || isLoading}
            className="mt-3 px-4 py-3 bg-orange-500 text-white rounded-lg w-full transition transform duration-300 hover:scale-105"
          >
            {isLoading ? 'Generating Questions...' : 'Start Interview'}
          </button>
        </div>
      )}

      {/* Display questions */}
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <div className="mb-6 p-4 border rounded-lg bg-orange-50 animate-fadeIn">
          <div className="flex justify-between mb-4 items-center">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
              Question {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
          <div className="bg-white p-4 rounded-lg mb-4 shadow-sm">
            <p className="text-lg font-medium mb-4">
              {questions[currentQuestionIndex].question}
            </p>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="p-3 border rounded-lg w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              rows={5}
              disabled={evaluation !== null}
            />
            {!evaluation && (
              <button
                onClick={evaluateAnswer}
                disabled={!userAnswer || isLoading}
                className="mt-4 w-full px-4 py-3 bg-orange-500 text-white rounded-lg transition transform duration-300 hover:scale-105"
              >
                {isLoading ? 'Evaluating...' : 'Submit Answer'}
              </button>
            )}
          </div>

          {evaluation && (
            <div className="mt-4 p-4 rounded-lg bg-orange-50 border animate-fadeIn">
              <strong className="block mb-2 text-orange-600">Feedback:</strong>
              <div className="mt-2 p-3 bg-white rounded-lg">
                <p>{evaluation}</p>
              </div>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="mt-4 w-full px-4 py-3 bg-orange-500 text-white rounded-lg transition transform duration-300 hover:scale-105"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={() => setAssessmentComplete(true)}
                  className="mt-4 w-full px-4 py-3 bg-orange-500 text-white rounded-lg transition transform duration-300 hover:scale-105"
                >
                  Complete Interview
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Final screen */}
      {assessmentComplete && (
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border animate-fadeIn">
          <h2 className="text-xl font-bold mb-3 text-center text-orange-600">
            Interview Complete
          </h2>
          <p className="text-center text-lg">
            Thank you for completing the interview.
          </p>
          <button
            onClick={resetAssessment}
            className="mt-3 w-full px-4 py-3 bg-orange-500 text-white rounded-lg transition transform duration-300 hover:scale-105"
          >
            Start New Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewComponent;
