import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import porsche from "./porsche.png";

const Card = ({ title, bgColor }) => {
    return (
        <div className="col-4">
            <div className="card" style={{ border: "none", backgroundColor: bgColor }}>
                <img
                    src={porsche} // Sử dụng ảnh đã import
                    className="card-img-top"
                    alt="Porsche"
                    style={{ padding: "20px" }}
                />
                <div className="card-body text-center">
                    <p className="card-text">{title}</p>
                </div>
            </div>
        </div>
    );
};

const CardsLayout = () => {
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Cards Columns</h2>
            <div className="row g-3">
                <Card
                    imgSrc="https://via.placeholder.com/400x200"
                    title="Some text inside the first card"
                    bgColor="#317CF6"
                />
                <Card
                    imgSrc="https://via.placeholder.com/400x200"
                    title="Some text inside the first card"
                    bgColor="#ECBA41"
                />
                <Card
                    imgSrc="https://via.placeholder.com/400x200"
                    title="Some text inside the first card"
                    bgColor="#CB444A"
                />
            </div>
        </div>
    );
};

export default CardsLayout;
