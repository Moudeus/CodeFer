import React, { useState, useEffect } from "react";
import "./Quiz.css";

export const quizData = [
  {
    question: "What is ReactJS?",
    answers: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
  {
    question: "What is JSX?",
    answers: ["A programming language", "A file format", "A syntax extension for JavaScript"],
    correctAnswer: "A syntax extension for JavaScript",
  },
];

const Quiz = ({ onCelebrationStart, onCelebrationEnd }) => {
  const [questions, setQuestions] = useState(quizData);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [score, setScore] = useState(0);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answers: ["", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    if (showResults) {
      onCelebrationStart();
      // Stop celebration after 5 seconds
      const timer = setTimeout(() => {
        onCelebrationEnd();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showResults, onCelebrationStart, onCelebrationEnd]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.question && newQuestion.answers.every((answer) => answer) && newQuestion.correctAnswer) {
      setQuestions((prev) => [...prev, newQuestion]);
      setNewQuestion({
        question: "",
        answers: ["", "", ""],
        correctAnswer: "",
      });
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const handleSubmit = () => {
    if (Object.keys(userAnswers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    setShowScorePopup(true);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setShowResults(false);
    setShowScorePopup(false);
    onCelebrationEnd();
  };

  return (
    <div className="quiz-container">
      <h2>Quiz Application</h2>

      {/* Add New Question Form */}
      <div className="add-question-form">
        <h3>Add New Question</h3>
        <form onSubmit={handleAddQuestion}>
          <div>
            <input
              type="text"
              placeholder="Enter question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion((prev) => ({
                  ...prev,
                  question: e.target.value,
                }))
              }
            />
          </div>
          {newQuestion.answers.map((answer, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Answer option ${index + 1}`}
                value={answer}
                onChange={(e) => {
                  const newAnswers = [...newQuestion.answers];
                  newAnswers[index] = e.target.value;
                  setNewQuestion((prev) => ({
                    ...prev,
                    answers: newAnswers,
                  }));
                }}
              />
            </div>
          ))}
          <div>
            <select
              value={newQuestion.correctAnswer}
              onChange={(e) =>
                setNewQuestion((prev) => ({
                  ...prev,
                  correctAnswer: e.target.value,
                }))
              }>
              <option value="">Select correct answer</option>
              {newQuestion.answers.map(
                (answer, index) =>
                  answer && (
                    <option key={index} value={answer}>
                      {answer}
                    </option>
                  )
              )}
            </select>
          </div>
          <button type="submit">Add Question</button>
        </form>
      </div>

      {/* Display Questions */}
      <div className="questions-list">
        <h3>Quiz Questions</h3>
        {questions.map((q, questionIndex) => (
          <div key={questionIndex} className="question-box">
            <p>{q.question}</p>
            <div className="answers">
              {q.answers.map((answer, answerIndex) => (
                <label key={answerIndex}>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={answer}
                    checked={userAnswers[questionIndex] === answer}
                    onChange={() => handleAnswerSelect(questionIndex, answer)}
                    disabled={showResults}
                  />
                  {answer}
                </label>
              ))}
            </div>
            {showResults && (
              <div className="result">
                {userAnswers[questionIndex] === q.correctAnswer ? (
                  <span className="correct">Correct!</span>
                ) : (
                  <span className="incorrect">Incorrect. Correct answer: {q.correctAnswer}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={handleSubmit} className="submit-btn" disabled={showResults}>
          Submit Quiz
        </button>
        {showResults && (
          <button onClick={handleRetake} className="retake-btn">
            Retake Quiz
          </button>
        )}
      </div>

      {showScorePopup && (
        <div className="score-popup">
          <div className="score-content">
            <h2>Your Score</h2>
            <div className="score-value">{score}%</div>
            <button onClick={() => setShowScorePopup(false)}>Close</button>
          </div>
        </div>
      )}

      {showResults && <div className="celebration-overlay" />}
    </div>
  );
};

export default Quiz;
