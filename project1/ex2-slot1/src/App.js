import logo from "./logo.svg";
import "./App.css";

function App() {
  const person = [
    {
      name: "John Doe",
      age: 30,
    },
    { name: "messi", age: 35 },
    { name: "ronaldo", age: 32 },
    {
      name: "Neymar",
      age: 28,
    },
    {
      name: "Lionel",
      age: 30,
    },
  ];

  return (
    <>
      <h1>List</h1>

      {person.map((person, index) => {
        return (
          <div>
            <h2 style={{ color: "red" }}> stt: {index + 1}</h2>
            <li>name : {person.name}</li>
            <li>age : {person.age}</li>
          </div>
        );
      })}
    </>
  );
}
export default App;
