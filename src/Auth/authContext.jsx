import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      toast.success("Login successful");
      
      return { success: true, user: loggedUser }; // Return user data
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logout successful");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}