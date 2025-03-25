import axios from "axios";
import React, { useReducer, useState, useEffect, use } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, redirect, useNavigate } from "react-router-dom";
import { IAccount } from "../../Interfaces/ProjectInterfaces";
import { LoginGoogle } from "./LoginGoogle";




export const LoginForm = () => {
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
  const initialState = { email: "", password: "", isSubmitted: false };
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<any>({});
  const [succes, setSucces] = useState<any>(false);
  const [banned, setBanned] = useState<any>(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleValidation = () => {
    const newErrors: any = {};
    if (!state.email) newErrors.email = "Username is required";
    if (!state.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000)
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };
  const [userAccount, setUserAccount] = useState<IAccount[]>([]);

  useEffect(() => {

    if (sessionStorage.getItem("auth")) {
      navigate("/products");
    }
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

      let _u: IAccount | null | undefined = null;
      _u = userAccount.find(user => {
        if (user.email === state.email && user.password === state.password) {
          return user;
        }
      })

      if (_u === null || _u === undefined) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000)
      } else {
        if (_u.status === "inactive") {
          setBanned(true);
          setTimeout(() => {
            setBanned(false);
          }, 1000)
        } else {
          setSucces(true);
          sessionStorage.setItem("auth", JSON.stringify(_u));
          sessionStorage.setItem("userRole", _u.role);
          setTimeout(() => {
            if (_u.role === "admin") {
              navigate("/admin");
            }
            else {
              navigate("/products");
            }
          }, 1000)
        }
      }
    }
  };


  return (
    <Container className="w-25 my-5 border rounded shadow" >
      <h2 className="d-flex justify-content-center mt-3">Login</h2>

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
          <Button variant="primary" type="submit" className="my-2 w-100">Login</Button>
        </div>
        <div>
          <Link to="/register" className="custom-link d-flex justify-content-center">
            Don't have an account? Register here
          </Link>


        </div>


        <div className="d-flex justify-content-center mb-2">
          <LoginGoogle userAccount = {userAccount}/>
        </div>


      </Form>
      {showAlert && (
        <Alert variant="danger" >
          <strong>Error :</strong> Invalid username or password!
        </Alert>
      )}
      {succes && (
        <Alert variant="success">
          <strong>Success :</strong> Welcome, {state.email.split("@")[0]} login Successful!!
        </Alert>
      )}
      {banned && (
        <Alert variant="danger">
          <strong>Warning :</strong> You account has been banned
        </Alert>
      )}
    </Container>
  )
}