import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Dropdown, Card, Button } from 'react-bootstrap';
import { FaShoppingCart, FaHistory } from 'react-icons/fa';
import { IProduct, ICart, ICartItem, IAccount } from '../../../Interfaces/ProjectInterfaces';
import './ProductList.css';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('default');
    const [cart, setCart] = useState<ICart | null>(null);
    const [user, setUser] = useState<IAccount | null>(null);


    const navigate = useNavigate();

    useEffect(() => {
        const authData = sessionStorage.getItem("auth");
        if (authData) {
            const parsedUser: IAccount = JSON.parse(authData);
            setUser(parsedUser);
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchCart = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5000/carts?user=${user.id}`);
                    const userCart = response.data[0];
                    if (userCart) {
                        setCart(userCart);
                    } else {
                        const newCart: ICart = {
                            user: Number(user.id),
                            items: [],
                            total: 0,
                            id: `${user.id}-${Date.now()}`
                        };
                        setCart(newCart);
                    }
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            }
        };

        fetchProducts();
        if (user) fetchCart();
    }, [user]);

    useEffect(() => {
        let updatedProducts = [...products];

        if (searchTerm) {
            updatedProducts = updatedProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortOrder === 'lowToHigh') {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'highToLow') {
            updatedProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(updatedProducts);
    }, [searchTerm, sortOrder, products]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (order: string) => {
        setSortOrder(order);
    };

    const addToCart = async (product: IProduct) => {
        if (!cart || !user) {

            alert("Please log in to add products to the cart!");

            return;
        }

        const existingItem = cart.items.find(item => item.productId === product.id);
        let updatedItems: ICartItem[];

        if (existingItem) {
            updatedItems = cart.items.map(item =>
                item.productId === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedItems = [...cart.items, { productId: product.id, quantity: 1 }];
        }

        const newTotal = updatedItems.reduce((sum, item) => {
            const productPrice = products.find(p => p.id === item.productId)?.price || 0;
            return sum + productPrice * item.quantity;
        }, 0);

        const updatedCart: ICart = { ...cart, items: updatedItems, total: newTotal };

        setCart(updatedCart);
        sessionStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));

        try {
            const existingCart = await axios.get(`http://localhost:5000/carts?user=${user.id}`);
            if (existingCart.data.length > 0) {
                await axios.put(`http://localhost:5000/carts/${updatedCart.id}`, updatedCart);
            } else {
                await axios.post("http://localhost:5000/carts", updatedCart);
            }
        } catch (error) {

            console.error("Error updating cart on the server:", error);

        }
    };

    const cartItemCount = cart
        ? cart.items.reduce((total, item) => total + item.quantity, 0)
        : 0;


    const handleLogout = () => {
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem(`cart_${user?.id}`);
        sessionStorage.removeItem(`userRole`);
        navigate("/");
    };
    return (
        <Container className="product-list-container">
            <Row className="mb-4 align-items-center">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </Col>
                <Col md={4}>
                    <Dropdown onSelect={(eventKey: any) => handleSortChange(eventKey)}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-sort">
                            Sort by price
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="default">Default</Dropdown.Item>
                            <Dropdown.Item eventKey="lowToHigh">Low to High</Dropdown.Item>
                            <Dropdown.Item eventKey="highToLow">High to Low</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={4} className="text-end">
                    {user?.role === 'admin' ? (
                        <Button variant="primary" onClick={() => navigate("/products/manage")}>
                            Manage Product
                        </Button>
                    ) : (
                        <>
                            <Button variant="link" onClick={() => navigate("/cart")} className="me-3">
                                <FaShoppingCart size={30} className="cart-icon" />
                                {cartItemCount > 0 && (
                                    <span className="badge bg-danger rounded-pill ms-1">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Button>
                            <Button variant="link" onClick={() => navigate("/order-history")}>
                                <FaHistory size={30} className="cart-icon" />
                            </Button>
                        </>
                    )}
                    <Button variant="warning" onClick={() => handleLogout()} className='ms-2'>
                        Logout
                    </Button>
                </Col>
            </Row>

            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col md={4} key={product.id} className="mb-4">
                            <Card className="product-card">
                                <Card.Img
                                    variant="top"
                                    src={product.imageUrl || 'https://via.placeholder.com/150'}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.price.toLocaleString('vi-VN')} VND</Card.Text>
                                    <div className="d-flex justify-content-between">

                                        <Button variant="primary" onClick={() => navigate(`/products/${product.id}`)}>
                                            View Details

                                        </Button>
                                        {user?.role !== 'admin' && (
                                            <Button variant="success" onClick={() => addToCart(product)}>
                                                Add to Cart
                                            </Button>
                                        )}

                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No products found.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default ProductList;
