import logo from "./logo.svg";
import "./App.css";

import IncreaseButton from "./Components/IncreaseButton";
import Textbox from "./Components/Textbox";
import ToggleVisibility from "./Components/ToggleVisibility";
import TodoList from "./Components/TodoList";
import ColorSwitcher from "./Components/ColorSwitcher";
import SearchFilter from "./Components/SearchFilter";
import DragAndDropList from "./Components/DragAndDropList";

function App() {
  return (
    <div className="App">
      <div className="component-container">
        <IncreaseButton />
      </div>
      <div className="component-container">
        <Textbox />
      </div>
      <div className="component-container">
        <ToggleVisibility />
      </div>
      <div className="component-container">
        <TodoList />
      </div>
      <div className="component-container">
        <ColorSwitcher />
      </div>
      <div className="component-container">
        <SearchFilter />
      </div>
      <div className="component-container">
        <DragAndDropList />
      </div>
    </div>
  );
}

export default App;
