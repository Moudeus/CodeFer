import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { IProduct } from "../../../Interfaces/ProjectInterfaces";
import { useNavigate } from "react-router-dom";
import './AddProduct.css';

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IProduct>({
        id: `${Date.now()}`,
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
        reviews: []
    });
    const [error, setError] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.description) {
            setError("Please fill in all the required fields!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/products", formData);
            navigate("/products/manage");
        } catch (error) {
            console.error("Error when adding product:", error);
            setError("An error occurred while adding the product!");
        }
    };

    return (
        <Container className="my-5">
            <Card>
                <Card.Body>
                    <Card.Title>Add new product</Card.Title>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
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
                            <Form.Label>URL image</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
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

export default AddProduct;