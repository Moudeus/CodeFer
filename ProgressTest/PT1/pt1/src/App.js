import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
