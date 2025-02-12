import React from "react";
import "./css/SimpleCard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SimpleCard = () => {
  return (
    <div className="simple-card border rounded-lg shadow-md p-4 flex items-center bg-white border-radius-30">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
        alt="FPT University Logo"
        className="w-40 h-auto"
      />
      <div className="ml-4">
        <h2 className="text-lg font-bold">Hoai Nguyen - FPT DaNang</h2>
        <p className="text-gray-600">Mobile: 0982827763</p>
      </div>
    </div>
  );
};

export default SimpleCard;
