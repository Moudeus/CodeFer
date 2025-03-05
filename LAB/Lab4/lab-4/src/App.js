import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [balls, setBalls] = useState([]);
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    // Create 3-5 random balls
    const createRandomBalls = () => {
      const numBalls = Math.floor(Math.random() * 3) + 3; // Random number between 3 and 5
      const newBalls = Array.from({ length: numBalls }, (_, index) => ({
        id: index,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 200 + 300, // Random size between 300px and 500px
        speed: 0.5 + Math.random() * 0.5, // Increased speed
        angle: Math.random() * Math.PI * 2,
        amplitude: 100 + Math.random() * 150, // Increased movement range
      }));
      setBalls(newBalls);
    };

    createRandomBalls();

    // Animation frame for moving balls
    let animationFrameId;
    const animate = () => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => {
          const time = Date.now() * (isCelebrating ? ball.speed * 4 : ball.speed) * 0.001;
          let newX, newY;

          if (isCelebrating) {
            // Circular celebration motion
            const radius = ball.amplitude * 2;
            newX = ball.x + Math.cos(time * 5) * radius;
            newY = ball.y + Math.sin(time * 5) * radius;
          } else {
            // Normal floating motion
            newX = ball.x + Math.cos(time) * ball.amplitude;
            newY = ball.y + Math.sin(time * 1.5) * ball.amplitude;
          }

          return {
            ...ball,
            currentX: newX,
            currentY: newY,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isCelebrating]);

  // Listen for custom event from Quiz component
  useEffect(() => {
    const handleCelebration = (e) => setIsCelebrating(e.detail.celebrating);
    window.addEventListener("quiz-celebration", handleCelebration);
    return () => window.removeEventListener("quiz-celebration", handleCelebration);
  }, []);

  return (
    <div className="App">
      <div className="gradient-balls-container">
        {balls.map((ball) => (
          <div
            key={ball.id}
            className={`gradient-ball ${isCelebrating ? "celebrating" : ""}`}
            style={{
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              transform: `translate(${ball.currentX - ball.size / 2}px, ${ball.currentY - ball.size / 2}px)`,
            }}
          />
        ))}
      </div>
      <Quiz
        onCelebrationStart={() => {
          const event = new CustomEvent("quiz-celebration", { detail: { celebrating: true } });
          window.dispatchEvent(event);
        }}
        onCelebrationEnd={() => {
          const event = new CustomEvent("quiz-celebration", { detail: { celebrating: false } });
          window.dispatchEvent(event);
        }}
      />
    </div>
  );
}

export default App;
