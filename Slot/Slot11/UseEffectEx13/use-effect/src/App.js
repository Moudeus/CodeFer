import React, { useEffect } from "react";
import "./App.css";
import UserPosts from "./components/UserPosts";
import CountdownTimer from "./components/CountdownTimer";
import WindowSize from "./components/WindowSize";
import ValidatedInput from "./components/ValidatedInput";

function App() {
  const validateInput = (value) => value.length > 3;

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;
      document.body.style.background = `linear-gradient(to bottom right, rgb(${xPercent}%, 0%, ${
        100 - xPercent
      }%), rgb(0%, ${yPercent}%, ${100 - yPercent}%))`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <h1>React useEffect Exercises</h1>
      <h2>User Posts</h2>
      <div className="UserPosts">
        <UserPosts userId={1} />
      </div>
      <h2>Countdown Timer</h2>
      <div className="CountdownTimer">
        <CountdownTimer initialValue={10} />
      </div>
      <h2>Window Size</h2>
      <div className="WindowSize">
        <WindowSize />
      </div>
      <h2>Validated Input</h2>
      <div className="ValidatedInput">
        <ValidatedInput validationFunction={validateInput} errorMessage="Input must be longer than 3 characters" />
      </div>
    </div>
  );
}

export default App;
