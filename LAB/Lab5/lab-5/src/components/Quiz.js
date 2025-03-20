import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Quiz() {
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Venus", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      id: 5,
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Fe", "Au", "Cu"],
      correctAnswer: "Au",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore((correctAnswers / questions.length) * 100);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Quiz</h2>
      {score !== null ? (
        <Card className="mb-4">
          <Card.Body>
            <h3>Your Score: {score}%</h3>
            <Button
              variant="primary"
              onClick={() => {
                setScore(null);
                setAnswers({});
              }}>
              Try Again
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <Card key={question.id} className="mb-4" style={{ padding: "1rem" }}>
              <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                {question.options.map((option, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`q${question.id}-${index}`}
                    label={option}
                    name={`question-${question.id}`}
                    onChange={() => handleAnswerSelect(question.id, option)}
                    checked={answers[question.id] === option}
                    required
                  />
                ))}
              </Card.Body>
            </Card>
          ))}
          <Button variant="primary" type="submit">
            Submit Quiz
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default Quiz;
