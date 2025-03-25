import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, Table, Button } from "react-bootstrap";
import { Sidebar } from "./SideBar";
import { Chart } from "./Chart";
import { LineChart } from "./LineChart";
import "./CSS/Dashboard.css";
import {IProduct} from "../../Interfaces/ProjectInterfaces";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get("http://localhost:5000/accounts");
                setTotalUsers(userResponse.data.length);
                const productResponse = await axios.get("http://localhost:5000/products");
                setTotalProducts(productResponse.data.length);
                setProducts(productResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const goHome = () => {
        navigate('/products')
    }

    return (
        <div className="dashboard-wrapper position-relative">
            <div className="header sticky-top p-3 text-white d-flex align-items-center justify-content-between bg-dark">
                <h1 className="header_text">Admin Dashboard</h1>
                <div>
                    <Button variant="light" onClick={toggleSidebar} >
                        {isSidebarOpen ? "Close Menu" : "Open Menu"}
                    </Button>
                    <Button variant="warning" onClick={goHome} className="ms-2">
                        Home Page
                    </Button>
                </div>
            </div>

            <Container fluid>
                <Row>
                    <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                        <Sidebar />
                    </div>

                    <Col className="main-content mt-2">
                        <Row className="justify-content-lg-evenly">
                            <Col xs={12} md={8} lg={6} className="mb-4">
                                <Card className="metric-card rounded-pill">
                                    <CardBody className="d-flex align-items-center justify-content-center">
                                        <div className="metric-icon me-3">
                                            <i className="bi bi-people-fill text-success" style={{ fontSize: "2rem" }}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-muted d-flex justify-content-center">Total Users</h3>
                                            <h3 className="text-center">{totalUsers}</h3>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col sx={12} md={8} lg={6} className="mb-4">
                                <Card className="metric-card rounded-pill">
                                    <CardBody className="d-flex align-items-center justify-content-center">
                                        <div className="metric-icon me-3">
                                            <i className="bi bi-box-seam-fill text-primary" style={{ fontSize: "2rem" }}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-muted d-flex justify-content-center">Total Products</h3>
                                            <h3 className="text-center">{totalProducts}</h3>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={8} lg={6}>
                                <Card>
                                    <CardBody className="pie-chart">
                                        <Chart />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs={12} md={8} lg={6}>
                                <Card>
                                    <CardBody className="line-chart">
                                        <LineChart />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <h4 className="text-muted mb-3">Product List</h4>
                                        <div className="table-responsive">
                                            <Table striped bordered hover>
                                                <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Product Name</th>
                                                    <th>Description</th>
                                                    <th>Price</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                {products.length > 0 ? (
                                                    products.map((product) => (
                                                        <tr key={product.id}>
                                                            <td>{product.id}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.description}</td>
                                                            <td>${product.price}</td>

                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="text-center">
                                                            No products available.
                                                        </td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
