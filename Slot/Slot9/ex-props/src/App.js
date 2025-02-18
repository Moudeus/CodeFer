import "./App.css";
import Welcome from "./components/Welcom";
import UserProfile from "./components/UserProfile";
import NameList from "./components/NameList";
import StudentCard from "./components/StudentList";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import student1 from "./img/image1.png";
import student2 from "./img/image2.png";
import student3 from "./img/image3.png";

function App() {
  const user = { username: "John", age: 25 };
  const nameList = ["John", "Doe", "Jane"];
  const students = [
    { name: "traltb1@fe.edu.vn", age: 39, avatar: student1 },
    { name: "traltb2@fe.edu.vn", age: 40, avatar: student2 },
    { name: "traltb3@fe.edu.vn", age: 41, avatar: student3 },
  ];

  return (
    <div>
      <Welcome />
      <UserProfile user={user} />
      <NameList names={nameList} />

      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row>
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
