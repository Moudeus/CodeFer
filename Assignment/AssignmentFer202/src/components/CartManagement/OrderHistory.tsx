import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { IAccount, IPaymentHistory } from "../../Interfaces/ProjectInterfaces";
import { useNavigate } from "react-router-dom";

export const OrderHistory = () => {
    const [paymentHistories, setPaymentHistories] = useState<IPaymentHistory[]>([]);
    const [user, setUser] = useState<IAccount | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authData = sessionStorage.getItem("auth");
        if (authData) {
            const parsedUser: IAccount = JSON.parse(authData);
            setUser(parsedUser);
        } else {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchPaymentHistories = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5000/paymentHistories?userId=${user.id}`);
                    setPaymentHistories(response.data);
                } catch (error) {
                    console.error("Error while retrieving payment history:", error);
                }
            }
        };

        if (user) fetchPaymentHistories();
    }, [user]);

    const handleBackToProducts = () => {
        navigate("/products");
    };

    return (
        <Container className="my-5">
            <h1>Order history</h1>
            <Button variant="secondary" onClick={handleBackToProducts} className="mb-3">
            Back to product list
            </Button>
            {!user ? (
                <p>Please login to view order history.</p>
            ) : paymentHistories.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div>
                    {paymentHistories.map((history) => (
                        <Row key={history.id} className="mb-3">
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Order #{history.id}</Card.Title>
                                        <Card.Text>
                                            <strong>Order date:</strong> {history.date}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Product:</strong>
                                            <ul>
                                                {history.products.map((product, index) => (
                                                    <li key={index}>
                                                        {product.name} - {product.price.toLocaleString('vi-VN')} VND
                                                    </li>
                                                ))}
                                            </ul>
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Total:</strong> {history.total.toLocaleString('vi-VN')} VND
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                </div>
            )}
        </Container>
    );
};