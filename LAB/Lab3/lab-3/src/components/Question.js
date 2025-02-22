import React from "react";

const Question = ({ question, options, onAnswerOptionClick }) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div>
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswerOptionClick(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
