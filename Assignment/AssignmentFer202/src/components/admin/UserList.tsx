import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Sidebar } from "./SideBar";
import { IAccount } from "../../Interfaces/ProjectInterfaces";
import "./CSS/UserList.css";

export const UserList = () => {
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/accounts");
            setAccounts(response.data);
        };
        fetchData();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleBanUser = async (userId: number) => {
        await axios.patch(`http://localhost:5000/accounts/${userId}`, { status: "inactive" });
        setAccounts((prevAccounts) =>
            prevAccounts.map((account) =>
                account.id === userId ? { ...account, status: "inactive" } : account
            )
        );
    };

    const handleUnbanUser = async (userId: number) => {
        await axios.patch(`http://localhost:5000/accounts/${userId}`, { status: "active" });
        setAccounts((prevAccounts) =>
            prevAccounts.map((account) =>
                account.id === userId ? { ...account, status: "active" } : account
            )
        );
    };

    return (
        <div className="userlist-wrapper">
            <div className="header p-3 text-white d-flex align-items-center justify-content-between">
                <h1 className="fw-bold">Accounts Management</h1>
                <Button variant="light" onClick={toggleSidebar}>
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
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.id}</td>
                                    <td>{account.username}</td>
                                    <td>{account.email}</td>
                                    <td>{account.role}</td>
                                    <td className={account.status === "active" ? "text-success" : "text-danger"}>
                                        {account.status}
                                    </td>
                                    <td>
                                        {account.role !== "admin" && (
                                            account.status === "active" ? (
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleBanUser(account.id)}
                                                >
                                                    Ban User
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleUnbanUser(account.id)}
                                                >
                                                    Unban User
                                                </Button>
                                            )
                                        )}
                                    </td>
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
