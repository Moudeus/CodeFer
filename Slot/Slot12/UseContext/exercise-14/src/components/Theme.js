import React from "react";
import { useTheme, themes } from "../contexts/ThemeContext"; // Import themes

const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ backgroundColor: theme.background, padding: "20px", minHeight: "100vh" }}>
      <h2>Current Theme: {theme === themes.light ? "Light" : "Dark"}</h2>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
          border: "1px solid",
          padding: "10px",
          cursor: "pointer",
        }}>
        Toggle Theme
      </button>
    </div>
  );
};

export default Theme;
