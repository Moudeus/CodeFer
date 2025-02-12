import logo from "./logo.svg";
import "./App.css";
import React from "react";
import MyInfo from "./components/MyInfo";
import HelloWorld from "./components/HelloWorld";
import Counter from "./components/Counter";
import SimpleWebsite from "./components/SimpleWebsite";
import SimpleCard from "./components/SimpleCard";
function App() {
  return (
    <div>
      <MyInfo />
      <HelloWorld />
      <Counter />
      <SimpleCard />
      <SimpleWebsite />
    </div>
  );
}

export default App;
