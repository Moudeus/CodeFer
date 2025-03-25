import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaMoneyCheck } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

export const Sidebar = () => {
    return (
        <div className="sidebar" style={{ backgroundColor: "#fffed1", height: "100vh", paddingTop: "60px" }}>
            <Link to="/admin" className="text-decoration-none fw-bold text-dark fs-5 d-flex align-items-center mt-2">
                <FaHome /> Dashboard
            </Link>
            <Link to="/UserList" className="text-decoration-none fw-bold text-dark fs-5 d-flex align-items-center mt-3">
                <IoPersonCircle /> User List
            </Link>
            <Link to="/PaymentHistory" className="text-decoration-none fw-bold text-dark fs-5 d-flex align-items-center mt-3">
                <FaMoneyCheck /> All Payment
            </Link>
        </div>
    );
};
