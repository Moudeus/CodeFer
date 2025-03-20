import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();     
        try {
            const response = await fetch(
                `http://localhost:5000/UserAccounts?username=${username}&password=${password}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const user = data[0];
            if (user) {
                setMessage(`Welcome, ${username} login Successful!`);
                setTimeout(() => navigate('/products'), 1000);
            } else {
                alert('Invalid username or password!');
            }
        } catch (error) {
            alert('Invalid username or password!');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;