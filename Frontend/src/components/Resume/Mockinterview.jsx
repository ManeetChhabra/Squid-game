import React, { useState } from 'react';

const Mockinterview = () => {
  // Set your Gemini 2.0 Flash API key here.
  // For the free model, you may leave it empty to use fallback questions.
  const GEMINI_API_KEY = "AIzaSyAQOWGKd2XS-fyNWrCWfDWNCqUGwvo03Fw"; 

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
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  // Safely parse JSON with error handling
  const safeJsonParse = (jsonString) => {
    try {
      return { success: true, data: JSON.parse(jsonString) };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Extract JSON array from a string
  const extractJsonFromText = (text) => {
    try {
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        let result = safeJsonParse(jsonString);
        if (!result.success) {
          // Attempt a simple sanitization if initial parse fails
          const sanitized = jsonString.replace(/\n/g, ' ').replace(/,\s*\]/g, ']');
          result = safeJsonParse(sanitized);
        }
        return result;
      } else {
        return { success: false, error: new Error("No JSON array found") };
      }
    } catch (err) {
      return { success: false, error: err };
    }
  };

  // Fetch questions from the Gemini 2.0 Flash API or use fallback questions if no API key is provided.
  const fetchQuestions = async () => {
    if (!selectedSkill) return;

    setIsLoading(true);
    setError(null);
    setAssessmentStarted(true);

    // If no API key is provided, use fallback questions.
    if (!GEMINI_API_KEY) {
      console.warn("No API key provided. Using fallback questions.");
      const fallbackQuestions = Array(5)
        .fill(null)
        .map((_, index) => ({
          question: `Fallback Question ${index + 1} for ${selectedSkill}`,
          options: [
            "A. Option 1",
            "B. Option 2",
            "C. Option 3",
            "D. Option 4"
          ],
          correctAnswer: "A",
          explanation: "This is a fallback explanation."
        }));
      setQuestions(fallbackQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswer('');
      setEvaluation(null);
      setScore(0);
      setTotalAnswered(0);
      setAssessmentComplete(false);
      setIsLoading(false);
      return;
    }

    try {
      // Use the Gemini 2.0 Flash model endpoint.
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Generate 5 multiple-choice objective questions to assess knowledge of ${selectedSkill}. 
For each question provide:
1. The question text (with increasing difficulty)
2. Four possible answers labeled A, B, C, D
3. The correct answer (one of A, B, C, or D)
4. A brief explanation of why that answer is correct
Format as a valid JSON array with structure:
[{"question": "question text", "options": ["A. option1", "B. option2", "C. option3", "D. option4"], "correctAnswer": "A", "explanation": "explanation text"}]
Ensure that the JSON is properly formatted.`
              }]
            }],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 1024
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'API error');
      }
      if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
        throw new Error('Invalid API response structure');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      const { success, data: parsedQuestions, error: jsonError } = extractJsonFromText(generatedText);
      if (!success) {
        throw new Error('Error parsing questions: ' + jsonError.message);
      }
      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        throw new Error('No valid questions received');
      }

      const validatedQuestions = parsedQuestions.map((q, index) => ({
        question: q.question || `Question ${index + 1}`,
        options: q.options || ["A. Option A", "B. Option B", "C. Option C", "D. Option D"],
        correctAnswer: q.correctAnswer || "A",
        explanation: q.explanation || "No explanation provided"
      }));

      setQuestions(validatedQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswer('');
      setEvaluation(null);
      setScore(0);
      setTotalAnswered(0);
      setAssessmentComplete(false);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setAssessmentStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Evaluate the user's answer
  const evaluateAnswer = () => {
    if (!userAnswer || !questions[currentQuestionIndex]) return;
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = userAnswer.toUpperCase() === currentQuestion.correctAnswer.toUpperCase();
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setTotalAnswered(prev => prev + 1);
    setEvaluation({
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation
    });
    if (currentQuestionIndex === questions.length - 1) {
      setAssessmentComplete(true);
    }
  };

  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setEvaluation(null);
    }
  };

  // Reset the entire assessment
  const resetAssessment = () => {
    setSelectedSkill('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setEvaluation(null);
    setScore(0);
    setTotalAnswered(0);
    setAssessmentStarted(false);
    setAssessmentComplete(false);
  };

  // Generate feedback based on the score
  const generateFeedback = () => {
    if (questions.length === 0) return "";
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Excellent! You have mastered this skill.";
    if (percentage >= 80) return "Great job! You have a strong understanding.";
    if (percentage >= 70) return "Good work! You have a solid understanding.";
    if (percentage >= 60) return "Not bad! You have a basic understanding.";
    return "You might need more practice.";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-orange-200 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600 animate-bounce">
        AI Skill Assessment
      </h1>

      {error && (
        <div className="mb-6 p-3 bg-orange-100 text-orange-800 rounded border border-orange-300">
          <strong>Error:</strong>
          <p>{error}</p>
        </div>
      )}

      {/* Skill selection (shown only if the assessment hasn't started) */}
      {!assessmentStarted && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-orange-600">Select a Skill</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {skills.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`p-3 border rounded-lg text-center transition-transform transform hover:scale-105 ${
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
            className="mt-3 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg w-full transition-colors duration-300"
          >
            {isLoading ? 'Generating Questions...' : 'Start Assessment'}
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
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
              Score: {score}/{totalAnswered}
            </span>
          </div>
          <div className="bg-white p-4 rounded-lg mb-4 shadow-sm border border-orange-100">
            <p className="text-lg font-medium mb-4">
              {questions[currentQuestionIndex].question}
            </p>
            <div className="space-y-3 mb-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => !evaluation && setUserAnswer(option.charAt(0))}
                  className={`p-3 rounded-lg cursor-pointer border transition-colors transform hover:bg-orange-50 ${
                    userAnswer === option.charAt(0)
                      ? 'bg-orange-100 border-orange-400'
                      : ''
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      value={option.charAt(0)}
                      checked={userAnswer === option.charAt(0)}
                      onChange={() => setUserAnswer(option.charAt(0))}
                      disabled={evaluation !== null}
                      className="mr-3"
                    />
                    <label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {!evaluation && (
              <button
                onClick={evaluateAnswer}
                disabled={!userAnswer || isLoading}
                className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300"
              >
                Submit Answer
              </button>
            )}
          </div>
          {evaluation && (
            <div
              className={`mt-4 p-4 rounded-lg transition-colors duration-300 ${
                evaluation.isCorrect
                  ? 'bg-orange-100 border border-orange-300'
                  : 'bg-orange-200 border border-orange-400'
              }`}
            >
              <strong>
                {evaluation.isCorrect
                  ? '✓ Correct!'
                  : `✗ Incorrect. Correct answer is ${evaluation.correctAnswer}.`}
              </strong>
              <div className="mt-2 p-3 bg-white rounded-lg shadow-sm border border-orange-100">
                <p>Explanation: {evaluation.explanation}</p>
              </div>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="mt-4 w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-transform transform hover:scale-105"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={() => setAssessmentComplete(true)}
                  className="mt-4 w-full px-4 py-3 bg-orange-700 hover:bg-orange-800 text-white rounded-lg transition-transform transform hover:scale-105"
                >
                  Complete Assessment
                </button>
              )}
            </div>
          )}
          {assessmentComplete && (
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200 animate-pulse">
              <h2 className="text-2xl font-bold mb-3 text-center text-orange-600">Results</h2>
              <p className="text-center text-lg">
                Final Score: {score}/{questions.length}
              </p>
              <p className="text-center mt-2 text-orange-700">{generateFeedback()}</p>
              <button
                onClick={resetAssessment}
                className="mt-3 w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300"
              >
                Start New Assessment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mockinterview;
