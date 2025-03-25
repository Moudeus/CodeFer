import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Sidebar } from "./SideBar";
import { IAccount, IProduct, IPaymentHistory } from "../../Interfaces/ProjectInterfaces";
import "./CSS/PaymentList.css";

export const PaymentList = () => {
    const [paymentHistories, setPaymentHistories] = useState<IPaymentHistory[]>([]);
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const paymentsResponse = await axios.get("http://localhost:5000/paymentHistories");
            setPaymentHistories(paymentsResponse.data);

            const accountsResponse = await axios.get("http://localhost:5000/accounts");
            setAccounts(accountsResponse.data);

            const productsResponse = await axios.get("http://localhost:5000/products");
            setProducts(productsResponse.data);
        };
        fetchData();
    }, []);

    const getUserName = (userId: number) => {
        console.log(accounts);
        const user = accounts.find((account) => String(account.id).trim() === String(userId).trim());
        return user ? user.username : "Unknown User";
    };

    const getProductNames = (productIds: IProduct[]) => {
        return productIds
            .map((productId) => {
                // @ts-ignore
                const product = products.find((p) => String(p.id).trim() === String(productId.id).trim());
                return product ? product.name : "Unknown Product";
            })
            .join(", ");
    };

    return (
        <div className="paymentlist-wrapper">
            <div className="header p-3 text-white d-flex align-items-center justify-content-between bg-dark">
                <h1 className="fw-bold">Payment History</h1>
                <Button variant="light" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? "Close Menu" : "Open Menu"}
                </Button>
            </div>

            <div className="content-wrapper d-flex">
                <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                    <Sidebar />
                </div>

                <Container fluid className="mt-4 main-content">
                    <div className="table-responsive my-4 shadow">
                        <Table striped bordered hover>
                            <thead className="bg-primary text-white">
                            <tr>
                                <th>Payment ID</th>
                                <th>Username</th>
                                <th>Products</th>
                                <th>Date</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paymentHistories.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{getUserName(payment.userId)}</td>
                                    <td>{getProductNames(payment.products)}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.total.toLocaleString()} VND</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        </div>
    );
};
