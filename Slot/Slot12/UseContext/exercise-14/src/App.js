import React, { useState } from "react";
import { CartProvider } from "./contexts/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import Theme from "./components/Theme";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import OrderConfirmation from "./components/OrderConfirmation";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import "./App.css"; // Import the CSS file

const AppContent = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ background: theme.background, color: theme.foreground, minHeight: "100vh" }}>
      <Theme />
      <ThemeToggle />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CartProvider>
        <h1>Simple Cart Application</h1>
        <DishesList searchTerm={searchTerm} />
        <Cart />
        <OrderConfirmation />
      </CartProvider>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
