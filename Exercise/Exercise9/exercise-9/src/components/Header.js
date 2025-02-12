import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/indexcc.css";

function Header() {
  return (
    <div class="container-s bg-orange">
      <div class="row justify-content-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
          alt=""
          class="w-50 bg-light mt-2"
        />
      </div>

      <div class="row d-flex py-3">
        <div class="d-flex justify-content-center">
          <a href="" class="text-decoration-none text-white mx-3">
            Home
          </a>
          <a href="" class="text-decoration-none text-white mx-3 ">
            About
          </a>
          <a href="" class="text-decoration-none text-white mx-3 ">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
