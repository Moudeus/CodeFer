import "./App.css";
import React from "react";
import EventHandlingDemo from "./Components/EventHandlingDemo";
import RenderAndCommitDemo from "./Components/RenderAndCommitDemo";
import SnapshotDemo from "./Components/SnapshotDemo";

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        {/* Animated background bubbles */}
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>

        {/* Main content */}
        <EventHandlingDemo />
        <RenderAndCommitDemo />
        <SnapshotDemo />
      </div>
    </React.StrictMode>
  );
}

export default App;
