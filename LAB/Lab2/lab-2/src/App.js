import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="container-fluid bg-dark">
      <NavBar />
      <Banner />
      <Menu />
      <Contact />
    </div>
  );
}

export default App;
