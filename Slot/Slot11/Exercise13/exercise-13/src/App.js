import React from "react";
import "./App.css";
import ValidatedInput from "./components/ValidatedInput";
import EmailPasswordForm from "./components/EmailPasswordForm";
import ValidationForm from "./components/ValidationForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App container mt-5">
      <div className="mb-4">
        <h2>Validated Input</h2>
        <ValidatedInput />
      </div>
      <div className="mb-4">
        <h2>Email and Password Form</h2>
        <EmailPasswordForm />
      </div>
      <div className="mb-4">
        <h2>Validation Form</h2>
        <ValidationForm />
      </div>
    </div>
  );
}

export default App;
