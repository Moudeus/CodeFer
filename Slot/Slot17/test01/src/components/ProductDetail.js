import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/Products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="container mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Product Details</h2>
            <Card>
                <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: '300px', margin: 'auto' }}
                />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text><strong>Price:</strong> {product.price}</Card.Text>
                    <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                    <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                    <Card.Text><strong>Stock:</strong> {product.stock}</Card.Text>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/products')}
                    >
                        Back to Product List
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductDetail;