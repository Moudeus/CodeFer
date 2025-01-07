import logo from "./logo.svg";
import "./App.css";

function App() {
  const person = {
    name: "Doan Nam Son",
    age: 30,
  };

  return (
    <>
      <h1>Hello World</h1>

      <li>name : {person.name}</li>
      <li>age : {person.age}</li>
    </>
  );
}
export default App;
