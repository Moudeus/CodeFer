import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { IProduct } from "../../../Interfaces/ProjectInterfaces";
import { useParams, useNavigate } from "react-router-dom";
import './UpdateProduct.css';

const UpdateProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IProduct | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("Unable to load product details!");
            }
        };
        fetchProduct();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }) : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData?.name || !formData?.price || !formData?.description) {
            setError("Please fill in all required fields!");
            return;
        }

        try {
            await axios.put(`http://localhost:5000/products/${id}`, formData);
            navigate("/products/manage");
        } catch (error) {
            console.error("Error updating product:", error);
            setError("An error occurred while updating the product!");
        }
    };

    if (!formData) {
        return <Container><p>Loading...</p></Container>;
    }

    return (
        <Container className="my-5">
            <Card>
                <Card.Body>
                    <Card.Title>Edit Product</Card.Title>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price (VND)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl || ""}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="me-2">
                            Save
                        </Button>
                        <Button variant="secondary" onClick={() => navigate("/products/manage")}>
                            Cancel
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UpdateProduct;
