import axios from "axios";
import React, { useReducer, useState, useEffect } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, redirect, useNavigate } from "react-router-dom";
import { IAccount } from "../../Interfaces/ProjectInterfaces";
import { LoginGoogle } from "./LoginGoogle";


export const Register = () => {

  const navigate = useNavigate();

  const formReducer = (state: typeof initialState, action: any) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "SUBMIT":
        return { ...state, isSubmitted: true };
      default:
        return state;
    }
  };



  const initialState = { email: "", password: "", username: "", isSubmitted: false };
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<any>({});
  const [succes, setSucces] = useState<Boolean>(false);
  const [duplicatedEmail, setDuplicatedEmail] = useState<Boolean>(false);

  const [showAlert, setShowAlert] = useState(false);
  const handleValidation = () => {
    const newErrors: any = {};
    if (!state.email) newErrors.email = "Username is required";
    if (!state.password) newErrors.password = "Password is required";
    if (!state.username) newErrors.username = "Username is required";
    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000)
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };


  const [userAccount, setUserAccount] = useState<IAccount[]>([]);

  useEffect(() => {
    const _dataAccount = async () => {
      const _data = await axios.get(`http://localhost:5000/accounts`).then(res => res.data);
      setUserAccount(_data);
    }


    _dataAccount();
  }, [])



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      dispatch({ type: "SUBMIT" });
      let _u = null;
      _u = userAccount.find(user => {
        if (user.email === state.email) {
          return user;
        }
      })
      const maxId = userAccount.length > 0 ? Math.max(...userAccount.map(user => user.id)) : 0;
      const newId = maxId + 1;

      if (_u === null || _u === undefined) {
        const newUser: IAccount = {
          id: newId,
          email: state.email,
          username: state.username,
          password: state.password,
          role: "user",
          status: "active"
        }

        axios.post(`http://localhost:5000/accounts`, newUser)
          .then(() => {
            setSucces(true);
            setTimeout(() => {
              setSucces(false);
              navigate("/");
            }, 2000);
          })
          .catch((error) => {
            console.error("There was an error creating the account!", error);
          });


      } else {
        setDuplicatedEmail(true);
        setTimeout(() => {
          setDuplicatedEmail(false);
        }, 2000)
      }
    }
  };


  return (
    <Container className="w-25 my-5 border rounded shadow" >
      <h2 className="d-flex justify-content-center mt-3">Register</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>

        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={state.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={state.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="warning" type="submit" className="my-2 w-100" >Register</Button>
        </div>
        <div>
          <Link to="/" className="custom-link d-flex justify-content-center mb-3">
            Already have account? Login here
          </Link>
        </div>
      </Form>
      {showAlert && (
        <Alert variant="danger" >
          <strong>Error :</strong> Don't let any field empty!
        </Alert>
      )}
      {succes && (
        <Alert variant="success">
          <strong>Success :</strong> Congratulations, {state.email.split("@")[0]} register Successful!!
        </Alert>
      )}
      {duplicatedEmail && (
        <Alert variant="danger">
          <strong>Warning :</strong> Email has been used
        </Alert>
      )}
    </Container>
  )
}