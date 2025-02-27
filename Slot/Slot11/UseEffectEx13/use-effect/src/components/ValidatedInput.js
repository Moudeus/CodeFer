import React, { useState, useEffect } from "react";

function ValidatedInput({ validationFunction, errorMessage }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(validationFunction(value));
  }, [value, validationFunction]);

  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className={isValid ? "" : "error"} />
      {!isValid && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ValidatedInput;
