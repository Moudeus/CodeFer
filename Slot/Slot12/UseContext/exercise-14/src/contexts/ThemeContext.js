import React, { createContext, useContext, useState, useEffect } from "react";

// Định nghĩa themes
export const themes = {
  light: {
    foreground: "#000000",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Light theme gradient
  },
  dark: {
    foreground: "#ffffff",
    background: "linear-gradient(135deg, #2c3e50, #4ca1af)", // Dark theme gradient
  },
};

// Tạo ThemeContext
const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
  };

  useEffect(() => {
    document.body.style.background = theme.background;
    document.body.style.color = theme.foreground;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Hook tùy chỉnh để sử dụng ThemeContext
export const useTheme = () => useContext(ThemeContext);
