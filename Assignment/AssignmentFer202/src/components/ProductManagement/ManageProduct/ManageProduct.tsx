import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { IProduct, IAccount } from "../../../Interfaces/ProjectInterfaces";
import { useNavigate } from "react-router-dom";
import './ManageProduct.css';

const ManageProduct: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [user, setUser] = useState<IAccount | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authData = sessionStorage.getItem("auth");
        if (authData) {
            const parsedUser: IAccount = JSON.parse(authData);
            setUser(parsedUser);
            if (parsedUser.role !== "admin") {
                alert("You do not have permission to access this page!");
                navigate("/products");
            }
        } else {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:5000/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    return (
        <Container className="my-5">
            <h1>Manage Products</h1>
            <div className="mb-3">
                <Button variant="secondary" onClick={() => navigate("/products")} className="me-2">
                    Back to product list
                </Button>
                <Button variant="primary" onClick={() => navigate("/products/add")}>
                    Add new product
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price (VND)</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price.toLocaleString('vi-VN')}</td>
                                <td>{product.description}</td>
                                <td>
                                    <img
                                        src={product.imageUrl || 'https://via.placeholder.com/50'}
                                        alt={product.name}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="info"
                                        className="me-2"
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    >
                                        View Detail
                                    </Button>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => navigate(`/products/update/${product.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">
                                No products available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default ManageProduct;
