import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

const ProductCard = ({ isOnSale }) => {
    return (
        <div className="col-3">
            <div className="card shadow-sm border-0 position-relative" 
            style={{overflow: "hidden",}}>
                <div className="position-relative">
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            width: "100%",
                            height: "280px",
                            backgroundColor: "#f0f0f0",
                            fontSize: "24px",
                            color: "#999",
                        }}
                    >
                        280 x 280
                    </div>
                    {isOnSale && (
                        <div
                            style={{
                                position: "absolute",
                                top: "20px",
                                right: "-80px",
                                backgroundColor: "orange",
                                color: "white",
                                width: "200px",
                                height: "40px",
                                textAlign: "center",
                                lineHeight: "40px",
                                fontSize: "20px",
                                fontWeight: "bold",
                                transform: "rotate(45deg)",
                                zIndex: 1,
                            }}
                        >
                            Sale
                        </div>
                    )}
                </div>
                <div className="card-body text-left">
                    <h5 className="card-title">Product</h5>
                    <p className="card-text mb-2">
                        <span className="text-muted text-decoration-line-through">
                            100.000 vnđ
                        </span>
                        <span className="ms-2" style={{ paddingLeft: '37%', color: 'orange' }}>80.000 vnđ</span>
                    </p>
                    <button className="btn btn-primary btn-sm me-2">
                        <i className="bi bi-cart"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductLayout = () => {
    return (
        <div className="container mt-4">
            <h2 className="mb-3" style={{ color: 'black' }}>NEW PRODUCT</h2>
            <p className="text-muted mb-4">List product description</p>
            <div className="row g-4">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard isOnSale={true} />
            </div>
        </div>
    );
};

export default ProductLayout;
