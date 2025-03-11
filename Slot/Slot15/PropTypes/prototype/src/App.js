import React from "react";
import UserProfile from "./components/UserProfile";
import UserProfile2 from "./components/UserProfile2";
import MyForm from "./components/MyForm";
import ValidatedForm from "./components/ValidatedForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const handleFormSubmit = (formData) => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="App container">
      <header className="text-center mb-5">
        <h1 className="display-4">React PropTypes Examples</h1>
        <p className="lead">Demonstration of PropTypes validation in React components</p>
      </header>

      {/* Example 1 */}
      <div className="example-section mt-5 mb-5">
        <h2>Ví dụ 1: Component UserProfile đơn giản</h2>
        <div className="mb-3">
          <UserProfile name="Nguyễn Văn A" age={25} />
        </div>
        <div className="mb-3">
          <UserProfile name="" age={25} />
        </div>
        <div className="mb-3">
          <UserProfile name="Nguyễn Văn B" age="twenty five" />
        </div>
        <div className="mb-3">
          <UserProfile name="Nguyễn Văn C" age={null} />
        </div>
      </div>

      {/* Example 2 */}
      <div className="example-section mt-5 mb-5">
        <h2>Ví dụ 2: Component UserProfile2 với Form</h2>
        <div className="mb-3">
          <UserProfile2 name="Nguyễn Văn A" age={25} onSubmit={handleFormSubmit} />
        </div>
        <div className="mb-3">
          <UserProfile2 name="Nguyễn Văn B" age="twenty five" onSubmit={handleFormSubmit} />
        </div>
        <div className="mb-3">
          <UserProfile2 name="" age={30} onSubmit={handleFormSubmit} />
        </div>
      </div>

      {/* Example 3 */}
      <div className="example-section mt-5 mb-5">
        <h2>Ví dụ 3: Component MyForm với Reducer</h2>
        <div className="mb-3">
          <MyForm title="Đăng Ký Người Dùng" onSubmit={handleFormSubmit} />
        </div>
      </div>

      {/* Example 4 */}
      <div className="example-section mt-5 mb-5">
        <h2>Ví dụ 4: Component ValidatedForm với Validation Rules</h2>
        <div className="mb-3">
          <ValidatedForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}

export default App;
