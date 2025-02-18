import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <div className="container-fluid bg-eacdad">
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
              className="bg-eacdad mt-2 fpt-logo ps-5"
              alt=""
            />
            <div className="d-flex mt-2 ps-2">
              <a href="" className="mt-4 d-flex pe-2 text-decoration-none text-orange">
                <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" className="icon bg-orange" alt="" />
                <div>Trang Chủ</div>
              </a>
              <a href="" className="mt-4 d-flex pe-2 text-decoration-none text-orange">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/12589/12589242.png"
                  className="icon bg-orange"
                  alt=""
                />
                <div>Ngành Học</div>
              </a>
              <a href="" className="mt-4 d-flex pe-2 text-decoration-none text-orange">
                <img src="https://cdn-icons-png.flaticon.com/512/3596/3596091.png" className="icon bg-orange" alt="" />
                <div>Tuyển Sinh</div>
              </a>
              <a href="" className="mt-4 d-flex pe-2 text-decoration-none text-orange">
                <img src="https://cdn-icons-png.flaticon.com/512/2099/2099192.png" alt="" className="icon bg-orange" />
                <div>Sinh Viên</div>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex mt-4">
            <div className="pe-2">Search:</div>
            <input type="text" className="ps-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
