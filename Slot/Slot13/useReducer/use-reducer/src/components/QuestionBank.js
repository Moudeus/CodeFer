import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  timeLeft: 10,
  feedback: null,
  highScore: parseInt(localStorage.getItem("quizHighScore")) || 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      const isCorrect = action.payload === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: action.payload,
        feedback: {
          correct: isCorrect,
          message: isCorrect
            ? "Correct! 🎉"
            : `Incorrect! The correct answer is ${state.questions[state.currentQuestion].answer}`,
        },
      };

    case "NEXT_QUESTION":
      const newScore =
        state.selectedOption === state.questions[state.currentQuestion].answer ? state.score + 1 : state.score;
      const isLastQuestion = state.currentQuestion + 1 === state.questions.length;
      const newHighScore = isLastQuestion && newScore > state.highScore ? newScore : state.highScore;

      if (isLastQuestion) {
        localStorage.setItem("quizHighScore", newHighScore.toString());
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: isLastQuestion,
        timeLeft: 10,
        feedback: null,
        highScore: newHighScore,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore,
      };

    case "TICK_TIMER":
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    let timer;
    if (!state.showScore && state.timeLeft > 0) {
      timer = setInterval(() => {
        dispatch({ type: "TICK_TIMER" });
      }, 1000);
    } else if (state.timeLeft === 0 && !state.showScore) {
      dispatch({ type: "NEXT_QUESTION" });
    }
    return () => clearInterval(timer);
  }, [state.timeLeft, state.showScore]);

  const handleOptionSelect = (option) => {
    if (!state.selectedOption) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  return (
    <Container className="mt-5 quiz-container">
      <Card className="mx-auto glass-card" style={{ maxWidth: "600px" }}>
        <Card.Body>
          {state.showScore ? (
            <div className="text-center">
              <h2>Quiz Complete!</h2>
              <p className="h4 mb-3">
                Your Score: {state.score} / {state.questions.length}
              </p>
              <p className="text-muted mb-4">
                High Score: {state.highScore} / {state.questions.length}
              </p>
              <Button variant="primary" onClick={handleRestartQuiz}>
                Restart Quiz
              </Button>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="m-0">
                  Question {state.currentQuestion + 1}/{state.questions.length}
                </h4>
                <span className={`h5 m-0 ${state.timeLeft < 5 ? "text-danger" : ""}`}>Time: {state.timeLeft}s</span>
              </div>

              <ProgressBar now={(state.currentQuestion / state.questions.length) * 100} className="mb-4" />

              <h4>{state.questions[state.currentQuestion].question}</h4>

              <div className="d-grid gap-2 mt-4">
                {state.questions[state.currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      state.selectedOption === option
                        ? option === state.questions[state.currentQuestion].answer
                          ? "success"
                          : "danger"
                        : "outline-primary"
                    }
                    onClick={() => handleOptionSelect(option)}
                    disabled={state.selectedOption !== ""}>
                    {option}
                  </Button>
                ))}
              </div>

              {state.feedback && (
                <Alert
                  variant={state.feedback.correct ? "success" : "danger"}
                  className="mt-3 d-flex align-items-center gap-2">
                  {state.feedback.correct ? <FaCheckCircle /> : <FaTimesCircle />}
                  {state.feedback.message}
                </Alert>
              )}

              <div className="text-center mt-4">
                <Button variant="primary" onClick={handleNextQuestion} disabled={!state.selectedOption}>
                  {state.currentQuestion === state.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default QuestionBank;
