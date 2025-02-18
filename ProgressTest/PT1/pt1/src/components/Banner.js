import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Banner = () => {
  return (
    <div className="container-fluid bg-orange">
      <div className="row justify-content-center">
        <img
          src="https://scontent.fdad3-4.fna.fbcdn.net/v/t1.15752-9/475346771_2357220154646832_396899804518326885_n.png?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=N0lm3ubG688Q7kNvgE6ptXQ&_nc_oc=Adj9tToMrWnOWl7q3YyZ_JkLxtDLLVgbHr18lElPKxv7hYcmfd8y-_eVa-vEkYAiLYSFgswVd7t5EIGgAFb078Xs&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&oh=03_Q7cD1gG8oIAc5-NQScWrew4n1XmYWQ3Njrre7m-PpWQDf8Ywsg&oe=67CD6C2C"
          alt=""
          className="w-100 ps-5 pe-5 mt-5 mb-5"
        />
      </div>
    </div>
  );
};

export default Banner;
