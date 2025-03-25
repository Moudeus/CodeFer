import React, { createContext, useState, useContext, useEffect } from "react";
import { UserAPI } from "../api";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for saved user data
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const user = await UserAPI.login(credentials);
      if (user) {
        // Remove sensitive data before storing
        const { password, ...safeUser } = user;
        setUser(safeUser);
        localStorage.setItem("user", JSON.stringify(safeUser));
        toast.success(`Welcome back, ${safeUser.username}!`);
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await UserAPI.register({
        ...userData,
        role: "user",
        status: "active",
      });
      toast.success("Registration successful! Please login.");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const checkRole = (requiredRole) => {
    if (!user) return false;

    switch (requiredRole) {
      case "admin":
        return user.role === "admin";
      case "manager":
        return user.role === "manager" || user.role === "admin";
      case "user":
        return true; // All logged-in users have basic user access
      default:
        return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkRole,
    isAdmin: user?.role === "admin",
    isManager: user?.role === "manager" || user?.role === "admin",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
