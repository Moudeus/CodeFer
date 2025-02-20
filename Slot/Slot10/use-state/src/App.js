import logo from "./logo.svg";
import "./App.css";

import IncreaseButton from "./components/IncreaseButton";
import NameTextbox from "./components/NameTextbox";
import ProductList from "./components/ProductList";
import ProductSelection from "./components/ProductSelection";

function App() {
  return (
    <div className="App">
      <IncreaseButton />
      <NameTextbox />
      <ProductList />
      <ProductSelection />
    </div>
  );
}

export default App;
