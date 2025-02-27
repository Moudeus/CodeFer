import React, { useState, useEffect } from "react";

function CountdownTimer({ initialValue }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeRemaining]);

  return <div>Time Remaining: {timeRemaining}</div>;
}

export default CountdownTimer;
