import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Tab } from "react-bootstrap";
import Counter from "./components/Counter";
import ChangeNameAge from "./components/ChangeNameAge";
import ItemList from "./components/ItemList";
import QuestionBank from "./components/QuestionBank";

function App() {
  const [key, setKey] = useState("counter");

  return (
    <div className="App">
      <Container fluid className="p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "15px" }}>
        <h1 className="text-center mb-4">UseReducer Examples</h1>

        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav variant="pills" className="justify-content-center mb-4">
            <Nav.Item>
              <Nav.Link eventKey="counter">Counter</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="nameage">Name & Age</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="itemlist">Item List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="quiz">Quiz</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="counter">
              <Counter />
            </Tab.Pane>
            <Tab.Pane eventKey="nameage">
              <ChangeNameAge />
            </Tab.Pane>
            <Tab.Pane eventKey="itemlist">
              <ItemList />
            </Tab.Pane>
            <Tab.Pane eventKey="quiz">
              <QuestionBank />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default App;
