import "./App.css";

function App() {
  const course = ["React", "ReactNative", "NodeJs"]; // Chuyển biến course ra ngoài

  return (
    <div style={{ padding: "5px 30px" }}>
      <h2>5.Display list of course</h2>
      <hr />

      <div style={{ padding: "20px" }}>
        <h1>Course names</h1>
        <ul>
          {course.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
