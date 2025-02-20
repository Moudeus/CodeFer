import react from "react";

function Textbox() {
  const [text, setText] = react.useState("");
  return (
    <div>
      <p>Your text is {text}</p>
      <div style={{ margin: "10px" }}>
        <input type="text" onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
}
export default Textbox;
