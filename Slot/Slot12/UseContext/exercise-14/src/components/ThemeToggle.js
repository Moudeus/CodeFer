import React from "react";
import { useTheme, themes } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{theme === themes.light ? "Switch to Dark Mode" : "Switch to Light Mode"}</button>
  );
};

export default ThemeToggle;
