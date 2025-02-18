import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Content = () => {
  return (
    <div className="container-fluid">
      <div className="home-student d-flex justify-content-center align-items-center py-3 ms-5">
        <span className="text-orange">
          Home / <span className="text-black">Student</span>
        </span>
      </div>
      <div className="mt-5 pt-5 fs-1 d-flex justify-content-center align-items-center fw-bold">Student Detail</div>
      <div className="mb-5">
        <div className="row stu-detail-items d-flex ps-5 ms-5 me-5 pe-5">
          <div className="col-md-6 mb-4">
            <div className="border border-dark">
              <img src="../img/image1.png" className="w-100 stu-img" alt="" />
              <div className="details">
                <div className="d-flex justify-content-center align-items-center mssv mt-3">DE180468</div>
                <div className="name mt-3 d-flex justify-content-between align-items-center ps-3 pe-3">
                  <div>Doan Xuan Son</div>
                  <div>Da Nang</div>
                </div>
                <div className="mb-3 mt-1 check-attendant d-flex justify-content-center align-items-center">
                  <div className="present pe-5 me-5">
                    <input className="present" name="Radio" type="radio" />
                    <label htmlFor="present">Present</label>
                  </div>
                  <div className="absent ps-5 ms-5">
                    <input className="absent" name="Radio" type="radio" />
                    <label htmlFor="absent">Absent</label>
                  </div>
                </div>
                <div
                  className="submit d-flex justify-content-center align-items-center"
                  style={{ marginBottom: "20px" }}>
                  <button className="bg-orange text-white" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="border border-dark">
              <img src="../img/image2.png" className="w-100 stu-img" alt="" />
              <div className="details">
                <div className="d-flex justify-content-center align-items-center mssv mt-3">DE180468</div>
                <div className="name mt-3 d-flex justify-content-between align-items-center ps-3 pe-3">
                  <div>Doan Xuan Son</div>
                  <div>Da Nang</div>
                </div>
                <div className="mb-3 mt-1 check-attendant d-flex justify-content-center align-items-center">
                  <div className="present pe-5 me-5">
                    <input className="present" name="Radio" type="radio" />
                    <label htmlFor="present">Present</label>
                  </div>
                  <div className="absent ps-5 ms-5">
                    <input className="absent" name="Radio" type="radio" />
                    <label htmlFor="absent">Absent</label>
                  </div>
                </div>
                <div
                  className="submit d-flex justify-content-center align-items-center"
                  style={{ marginBottom: "20px" }}>
                  <button className="bg-orange text-white" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="border border-dark">
              <img src="../img/image3.png" className="w-100 stu-img" alt="" />
              <div className="details">
                <div className="d-flex justify-content-center align-items-center mssv mt-3">DE180468</div>
                <div className="name mt-3 d-flex justify-content-between align-items-center ps-3 pe-3">
                  <div>Doan Xuan Son</div>
                  <div>Da Nang</div>
                </div>
                <div className="mb-3 mt-1 check-attendant d-flex justify-content-center align-items-center">
                  <div className="present pe-5 me-5">
                    <input className="present" name="Radio" type="radio" />
                    <label htmlFor="present">Present</label>
                  </div>
                  <div className="absent ps-5 ms-5">
                    <input className="absent" name="Radio" type="radio" />
                    <label htmlFor="absent">Absent</label>
                  </div>
                </div>
                <div
                  className="submit d-flex justify-content-center align-items-center"
                  style={{ marginBottom: "20px" }}>
                  <button className="bg-orange text-white" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="border border-dark">
              <img src="../img/image4.jpg" className="w-100 stu-img" alt="" />
              <div className="details">
                <div className="d-flex justify-content-center align-items-center mssv mt-3">DE180468</div>
                <div className="name mt-3 d-flex justify-content-between align-items-center ps-3 pe-3">
                  <div>Doan Xuan Son</div>
                  <div>Da Nang</div>
                </div>
                <div className="mb-3 mt-1 check-attendant d-flex justify-content-center align-items-center">
                  <div className="present pe-5 me-5">
                    <input className="present" name="Radio" type="radio" />
                    <label htmlFor="present">Present</label>
                  </div>
                  <div className="absent ps-5 ms-5">
                    <input className="absent" name="Radio" type="radio" />
                    <label htmlFor="absent">Absent</label>
                  </div>
                </div>
                <div
                  className="submit d-flex justify-content-center align-items-center"
                  style={{ marginBottom: "20px" }}>
                  <button className="bg-orange text-white" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
