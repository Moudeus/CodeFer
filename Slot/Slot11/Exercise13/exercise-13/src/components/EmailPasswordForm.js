import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  return password.length >= 8;
};

function EmailPasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMailMessage, setMailErrorMessage] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    if (emailTouched) {
      const valid = validateEmail(email);
      setIsEmailValid(valid);
      if (!valid) {
        setMailErrorMessage("Invalid email address!");
      } else {
        setMailErrorMessage("");
      }
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      const valid = validatePassword(password);
      setIsPasswordValid(valid);
      if (!valid) {
        setErrorMessage("Password must be at least 8 characters long!");
      } else {
        setErrorMessage("");
      }
    }
  }, [password, passwordTouched]);

  const isFormValid = isEmailValid && isPasswordValid && email && password;

  return (
    <Form className="p-4 border rounded w-50 mx-auto">
      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          isValid={emailTouched && isEmailValid}
          isInvalid={emailTouched && !isEmailValid}
        />
        <Form.Control.Feedback type="invalid">{errorMailMessage}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordTouched(true)}
          isValid={passwordTouched && isPasswordValid}
          isInvalid={passwordTouched && !isPasswordValid}
        />
        <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isFormValid} className="w-100">
        Submit
      </Button>
    </Form>
  );
}

export default EmailPasswordForm;
