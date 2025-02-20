import react from "react";

function NameTextbox() {
  const [name, setName] = react.useState("");
  const [age, setAge] = react.useState(0);

  return (
    <div>
      <p>
        Your name is {name} and you are {age} years old
      </p>
      <div style={{ margin: "10px" }}>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div style={{ margin: "10px" }}>
        <input type="number" onChange={(e) => setAge(e.target.value)} />
      </div>
    </div>
  );
}
export default NameTextbox;
