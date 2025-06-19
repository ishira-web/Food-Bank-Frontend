import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On mount: Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Login handler
  async function login(email, password) {
    try {
      const response = await fetch(`http://localhost:5000/api/account/login/me`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      const loggedUser = data.user || data;
      const token = data.token;

      if (!token) {
        throw new Error("Token not received from server.");
      }

      // Save to state
      setUser(loggedUser);
      setToken(token);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      toast.success("Login successful");

      return { success: true, user: loggedUser };
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Something went wrong during login.");
      return { success: false, message: error.message };
    }
  }

  // Logout handler
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout successful");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
