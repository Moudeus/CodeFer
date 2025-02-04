import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBarComponents from "./components/NavBarComponents";
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="container-fluid">
      <NavBarComponents />
      <Banner />
      <Menu />
      <Contact />
    </div>
  );
}

export default App;
