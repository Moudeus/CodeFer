import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser } from "react-icons/fa";

const FlightBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    from: "Hà Nội",
    to: "",
    direction: "one-way",
  });

  const cities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];

  useEffect(() => {
    updateToOptions();
  }, [formData.from]);

  const updateToOptions = () => {
    const toOptions = cities.filter((city) => city !== formData.from);
    setFormData((prevState) => ({
      ...prevState,
      to: toOptions[0] || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container mt-5">
      <div className="card p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        {" "}
        <h2 className="mb-4 text-center">Form đặt vé máy bay</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Họ tên
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Họ tên"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <small className="form-text text-muted">Phải nhập ít nhất 5 ký tự, in hoa...</small>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <small className="form-text text-muted">Phải nhập ít nhất 5 ký tự, in hoa...</small>
          </div>
          <div className="mb-3 row">
            <div className="col-md-6">
              <label htmlFor="from" className="form-label">
                Đi từ
              </label>
              <select className="form-select" id="from" name="from" value={formData.from} onChange={handleChange}>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="to" className="form-label">
                Đến
              </label>
              <select className="form-select" id="to" name="to" value={formData.to} onChange={handleChange}>
                {cities
                  .filter((city) => city !== formData.from)
                  .map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Chọn chiều đi:</label>
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="one-way"
                  name="direction"
                  value="one-way"
                  checked={formData.direction === "one-way"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="one-way">
                  Đi
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="round-trip"
                  name="direction"
                  value="round-trip"
                  checked={formData.direction === "round-trip"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="round-trip">
                  Về
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Đặt vé
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightBookingForm;
