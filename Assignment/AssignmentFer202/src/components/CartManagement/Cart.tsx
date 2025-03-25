import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { IProduct, ICart, IAccount, IPaymentHistory } from "../../Interfaces/ProjectInterfaces";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";


const MY_BANK = {

    BANK_ID: "970422", //MB Bank
    ACCOUNT_NO: "0356759177",
    TEMPLATE: "compact2",
    ACCOUNT_NAME: "Doan Xuan Son"
}


export const Cart = () => {
    const [cart, setCart] = useState<ICart | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [user, setUser] = useState<IAccount | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
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
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        const fetchCart = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5000/carts?user=${user.id}`);
                    const userCart = response.data[0];
                    if (userCart) {
                        setCart(userCart);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        };

        fetchProducts();
        if (user) fetchCart();
    }, [user]);

    const updateCart = async (updatedCart: ICart) => {
        if (!user) return;
        console.log("Updated cart:", updatedCart);
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
            console.error("Error when update cart on server:", error);
        }
    };

    const increaseQuantity = (productId: string) => {
        if (!cart) return;

        const updatedItems = cart.items.map(item =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        const newTotal = updatedItems.reduce((sum, item) => {
            const productPrice = products.find(p => p.id === item.productId)?.price || 0;
            return sum + productPrice * item.quantity;
        }, 0);

        const updatedCart: ICart = { ...cart, items: updatedItems, total: newTotal };
        updateCart(updatedCart);
    };

    const decreaseQuantity = (productId: string) => {
        if (!cart) return;

        const updatedItems = cart.items
            .map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0);

        const newTotal = updatedItems.reduce((sum, item) => {
            const productPrice = products.find(p => p.id === item.productId)?.price || 0;
            return sum + productPrice * item.quantity;
        }, 0);

        const updatedCart: ICart = { ...cart, items: updatedItems, total: newTotal };
        updateCart(updatedCart);
    };

    const removeItem = (productId: string) => {
        if (!cart) return;

        const updatedItems = cart.items.filter(item => item.productId !== productId);

        const newTotal = updatedItems.reduce((sum, item) => {
            const productPrice = products.find(p => p.id === item.productId)?.price || 0;
            return sum + productPrice * item.quantity;
        }, 0);

        const updatedCart: ICart = { ...cart, items: updatedItems, total: newTotal };
        updateCart(updatedCart);
    };

    const handleCheckout = () => {
        setShowPaymentModal(true);
    };


    // Xác nhận đã thanh toán
    const confirmPayment = async ({ transcode, parsedUser, parsedCart }: { transcode: number, parsedUser: IAccount, parsedCart: ICart }) => {
        const paymentHistory: IPaymentHistory = {
            id: transcode,
            userId: Number(parsedUser.id),

            products: await Promise.all(parsedCart.items.map(async (item) => {
                const _product : IProduct[] = await axios.get(`http://localhost:5000/products`).then(res => res.data);
                const product = _product.find(p => p.id === item.productId);

                return product || {
                    id: item.productId,
                    name: "Product does not exist",
                    price: 0,
                    description: "",
                    imageUrl: "",
                    reviews: []
                };

            })),
            total: parsedCart.total,

            date: new Date().toISOString().split('T')[0]
        };
    
        try {

            await axios.post(`http://localhost:5000/paymentHistories`, paymentHistory);
    
            // Xóa giỏ hàng
            const updatedCart: ICart = { ...parsedCart, items: [], total: 0 };
            await axios.put(`http://localhost:5000/carts/${parsedCart.id}`, updatedCart);
            sessionStorage.setItem(`cart_${parsedUser.id}`, JSON.stringify(updatedCart));
            // Đóng modal

            setShowPaymentModal(false);
            alert("Payment successful! Order has been saved to history.");
        } catch (error) {
            console.error("Error saving payment history:", error);
        }
    };



    const QR = "https://img.vietqr.io/image/" + MY_BANK.BANK_ID + "-" +
        MY_BANK.ACCOUNT_NO + "-" + MY_BANK.TEMPLATE + ".png?" +
        "&addInfo=" + user?.id + user?.role + "&amount=" + cart?.total + "&accountName=" + MY_BANK.ACCOUNT_NAME
    const AppScirpt = "https://script.googleusercontent.com/macros/echo?user_content_key=BkINLbtlTn49vfGL7uDFErRGyFRs-i-0j4f98qZpOrySgH3A4XWudFvBAnnOOluUkSRIgUXC0-Ikkbmzr1rJCIA5e_tt4tP5m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDzsAlD6ug9FsXOxdoyN-BO226sy0AJl2UoKLOqjRp3h9KpIYTSbk9vet7j5ea-Rg4Ol3lRZLwCEBiCs-ictM-yoBFes96d7Hg&lib=MLQuxm21goJkl3evos7ArRqisV3GZFA2q"


    const handleBackToProducts = () => {
        navigate("/products");
    };


    const checkPaid = async ({ parsedUser, parsedCart }: { parsedUser: IAccount, parsedCart: ICart }) => {
        try {
            if (success) return; // Nếu đã thanh toán, không kiểm tra nữa
    
            const response = await axios.get(AppScirpt);
            const data = response.data;
            const FinalRes = data.data;
    
            for (const BankData of FinalRes) {
                const lastPrice = BankData["Giá trị"];
                const lastContent = BankData["Mô tả"];
                const lastTransCode = BankData["Mã GD"];
                
                if (String(lastContent).trim().includes(`${parsedUser?.id}${parsedUser?.role}`) && Number(lastPrice) === parsedCart?.total) {
                    try {
                        const response = await axios.get(`http://localhost:5000/paymentHistories/${lastTransCode}`);
                        console.log("Trung transcode");
                    } catch (error: unknown) {
                        if (axios.isAxiosError(error) && error.response?.status === 404) {
                                console.log("✅ Thanh toán thành công! Cập nhật success...");
                                await confirmPayment({ transcode: Number(lastTransCode), parsedUser, parsedCart });
                                window.location.href = "/order-history";
                                setSuccess(true);
                        } else {
                            console.error("Lỗi khác:", error);
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Lỗi:", err);
        }
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        const authData = sessionStorage.getItem("auth");

        if (authData !== null) {
            const parsedUser: IAccount = JSON.parse(authData);
            const authCart = sessionStorage.getItem(`cart_${parsedUser?.id}`);
            const parsedCart: ICart = authCart ? JSON.parse(authCart) : null;
            if (!success) {
                checkPaid({ parsedUser, parsedCart });
                console.log("🔄 Bắt đầu kiểm tra thanh toán...");
                intervalId = setInterval(() => {
                    checkPaid({ parsedUser, parsedCart });
                }, 2000);
            }

        } else {

        }

        return () => {
            if (intervalId) {
                console.log("⏹️ Dừng kiểm tra thanh toán...");
                clearInterval(intervalId);
            }
        };
    }, [success]);

    return (
        <Container className="my-5">
            <h1>Your shopping cart</h1>
            <Button variant="secondary" onClick={handleBackToProducts} className="mb-3">
                Back to product list
            </Button>
            {!user ? (
                <p>Please login to view cart.</p>
            ) : !cart || cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.items.map((item, index) => {
                        const product = products.find(p => p.id === item.productId);
                        return (
                            <Row key={index} className="mb-3">
                                <Col>
                                    <Card>
                                        <Card.Body className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <Card.Title>{product?.name}</Card.Title>
                                                <Card.Text>
                                                    Unit price: {(product?.price || 0).toLocaleString('vi-VN')} VND
                                                </Card.Text>
                                                <Card.Text>
                                                    Quantity: {item.quantity}
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="ms-2"
                                                        onClick={() => increaseQuantity(item.productId)}
                                                    >
                                                        <FaPlus />
                                                    </Button>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="ms-1"
                                                        onClick={() => decreaseQuantity(item.productId)}
                                                    >
                                                        <FaMinus />
                                                    </Button>
                                                </Card.Text>
                                                <Card.Text>
                                                    Total: {((product?.price || 0) * item.quantity).toLocaleString('vi-VN')} VND
                                                </Card.Text>
                                            </div>
                                            <Button
                                                variant="danger"
                                                onClick={() => removeItem(item.productId)}
                                            >
                                                <FaTrash /> Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        );
                    })}
                    <h4>Total: {cart.total.toLocaleString('vi-VN')} VND</h4>
                    <Button variant="success" onClick={handleCheckout} className="mt-3">
                        Payment
                    </Button>
                </div>
            )}

            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>Please scan the QR code to pay:</p>
                    <img
                        src={QR}
                        alt="QR Code"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </Modal.Body>

            </Modal>
        </Container>
    );
};