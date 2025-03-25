// src/Components/ProductDetail.tsx
// Import các thư viện và thành phần cần thiết
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { IProduct, ICart, IAccount, ICartItem } from "../../../Interfaces/ProjectInterfaces";
import Review from "../../Review/Review";
import { FaShoppingCart, FaHistory } from "react-icons/fa"; // Import icon từ react-icons
import "./ProductDetail.css";

// Component ProductDetail: Hiển thị chi tiết sản phẩm và phần đánh giá
const ProductDetail: React.FC = () => {
    // Lấy id của sản phẩm từ URL params
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // State để lưu trữ thông tin sản phẩm, người dùng, giỏ hàng, và danh sách sản phẩm
    const [product, setProduct] = useState<IProduct | null>(null);
    const [sessionUser, setSessionUser] = useState<IAccount | null>(null);
    const [cart, setCart] = useState<ICart | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);

    // useEffect: Tải thông tin sản phẩm, người dùng, giỏ hàng và danh sách sản phẩm khi component được render
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Gửi yêu cầu GET để lấy thông tin chi tiết sản phẩm từ server
                const productResponse = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(productResponse.data);

                // Gửi yêu cầu GET để lấy danh sách tất cả sản phẩm (dùng để tính tổng tiền giỏ hàng)
                const productsResponse = await axios.get("http://localhost:5000/products");
                setProducts(productsResponse.data);

                // Lấy thông tin người dùng từ sessionStorage
                const userSession = sessionStorage.getItem("auth");
                if (userSession) {
                    const parsedUser: IAccount = JSON.parse(userSession);
                    setSessionUser(parsedUser);

                    // Nếu người dùng đã đăng nhập, lấy giỏ hàng của họ từ server
                    const cartResponse = await axios.get(`http://localhost:5000/carts?user=${parsedUser.id}`);
                    const userCart = cartResponse.data[0];
                    if (userCart) {
                        setCart(userCart);
                    }
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProduct();
    }, [id]); // Dependency: id, chạy lại khi id thay đổi

    // Hàm addToCart: Thêm sản phẩm vào giỏ hàng (dành cho user)
    const addToCart = async (product: IProduct) => {
        if (!cart || !sessionUser) {
            alert("Please login to add products to cart!");
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
        sessionStorage.setItem(`cart_${sessionUser.id}`, JSON.stringify(updatedCart));

        try {
            const existingCart = await axios.get(`http://localhost:5000/carts?user=${sessionUser.id}`);
            if (existingCart.data.length > 0) {
                await axios.put(`http://localhost:5000/carts/${updatedCart.id}`, updatedCart);
            } else {
                await axios.post("http://localhost:5000/carts", updatedCart);
            }
        } catch (error) {
            console.error("Error updating cart on server:", error);
        }
    };

    // Hàm handleDelete: Xóa sản phẩm (dành cho admin hoặc manager)
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:5000/products/${id}`);
                navigate(-1);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    // Tính tổng số lượng sản phẩm trong giỏ hàng để hiển thị trên badge
    const cartItemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

    // Nếu sản phẩm chưa được tải, hiển thị thông báo "Loading..."
    if (!product) {
        return (
            <Container>
                <p>Loading...</p>
            </Container>
        );
    }

    // Phần giao diện (JSX) của component ProductDetail
    return (
        <Container className="product-detail-container">
            {/* Header với nút Back và các icon (Cart, Order History) */}
            <Row className="mb-3 align-items-center">
                <Col className="text-start">
                    <Button variant="secondary" onClick={() => navigate("/products")}>
                        Back to product list
                    </Button>
                </Col>
                {/* Hiển thị icon Cart và Order History chỉ cho user */}
                {sessionUser?.role === "user" && (
                    <Col className="text-end">
                        {/* Icon Giỏ hàng */}
                        <Button
                            variant="link"
                            onClick={() => navigate("/cart")}
                            className="me-3"
                        >
                            <FaShoppingCart size={30} className="cart-icon" />
                            {cartItemCount > 0 && (
                                <span className="badge bg-danger rounded-pill ms-1">
                                    {cartItemCount}
                                </span>
                            )}
                        </Button>
                        {/* Icon Lịch sử đơn hàng */}
                        <Button
                            variant="link"
                            onClick={() => navigate("/order-history")}
                        >
                            <FaHistory size={30} className="cart-icon" />
                        </Button>
                    </Col>
                )}
            </Row>

            {/* Card hiển thị chi tiết sản phẩm */}
            <Row className="mb-4">
                <Col>
                    <Card className="product-detail-card">
                        <Row>
                            <Col md={6}>
                                {/* Hình ảnh sản phẩm, nếu không có imageUrl thì dùng ảnh placeholder */}
                                <Card.Img
                                    src={product.imageUrl || "https://via.placeholder.com/300"}
                                    alt={product.name}
                                    className="product-detail-image"
                                />
                            </Col>
                            <Col md={6}>
                                <Card.Body>
                                    {/* Tên sản phẩm */}
                                    <Card.Title>{product.name}</Card.Title>
                                    {/* Giá sản phẩm, định dạng theo tiền Việt Nam */}
                                    <Card.Text>
                                        <strong>Price: </strong>
                                        {product.price.toLocaleString("vi-VN")} VND
                                    </Card.Text>
                                    {/* Mô tả sản phẩm */}
                                    <Card.Text>
                                        <strong>Description: </strong>
                                        {product.description}
                                    </Card.Text>
                                    {/* Kiểm tra vai trò người dùng để hiển thị nút phù hợp */}
                                    {sessionUser?.role === "admin" ? (
                                        // Nếu là admin hoặc manager, hiển thị nút Update và Delete
                                        <div className="d-flex justify-content-between">
                                            <Button
                                                variant="warning"
                                                onClick={() => navigate(`/products/update/${id}`)}
                                            >
                                                Update
                                            </Button>
                                            <Button variant="danger" onClick={handleDelete}>
                                                Delete
                                            </Button>
                                        </div>
                                    ) : (
                                        // Nếu là user, hiển thị nút Add to cart
                                        <Button
                                            variant="success"
                                            onClick={() => addToCart(product)}
                                            disabled={!sessionUser} // Vô hiệu hóa nếu chưa đăng nhập
                                        >
                                            Add to cart
                                        </Button>
                                    )}
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            {/* Phần đánh giá sản phẩm */}
            <Row>
                <Col>
                    <h3>Product Reviews</h3>
                    {/* Truyền productId và sessionUser vào component Review để hiển thị phần đánh giá */}
                    <Review productId={id} sessionUser={sessionUser} />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;