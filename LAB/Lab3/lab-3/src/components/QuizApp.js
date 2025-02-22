import React, { useState } from "react";
import Question from "./Question";
import Score from "./Score";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  // Add more questions as needed
];

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      {showResult ? (
        <Score score={score} totalQuestions={quizData.length} />
      ) : (
        <Question
          question={quizData[currentQuestionIndex].question}
          options={quizData[currentQuestionIndex].options}
          onAnswerOptionClick={handleAnswerOptionClick}
        />
      )}
    </div>
  );
};

export default QuizApp;
