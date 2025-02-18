import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <div className="container-fluid bg-orange">
      <div className="row">
        <div className="col-md-7 ms-5 mt-3">
          <div className="fs-3 fw-bold">Our Address</div>
          <div className="items">
            <div>Khu đô thị FPT Đà Nẵng</div>
            <div className="item d-flex">
              <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" className="icon" alt="" />
              <div className="ps-2 text-primary">+8402311111</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex mt-5">
            <div className="item">
              <a href="">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111483.png"
                  className="icon-second ps-1"
                  alt=""
                />
              </a>
            </div>
            <div className="item">
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/512/20/20837.png" className="icon-second ps-1" alt="" />
              </a>
            </div>
            <div className="item">
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/512/80/80963.png" className="icon-second ps-1" alt="" />
              </a>
            </div>
            <div className="item">
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733635.png" className="icon-second ps-1" alt="" />
              </a>
            </div>
            <div className="item">
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/512/49/49084.png" className="icon-second ps-1" alt="" />
              </a>
            </div>
            <div className="item">
              <a href="">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4338/4338894.png"
                  className="icon-second ps-1"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mt-5 mb-3 d-flex justify-content-center align-items-center">&copy; CopyWrite 2023</div>
      </div>
    </div>
  );
};

export default Footer;
