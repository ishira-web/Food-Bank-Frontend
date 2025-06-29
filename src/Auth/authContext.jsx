import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    loading: true
  });

  // Initialize auth state and check token validity
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          
          // Check token expiration
          if (decoded.exp * 1000 < Date.now()) {
            throw new Error("Token expired");
          }

          // Use server-provided user data if available
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            setAuthState({
              user: userData,
              token: storedToken,
              loading: false
            });
          } else {
            // Fallback to token claims if user data isn't stored
            const userData = {
              id: decoded.sub || decoded.id || decoded.userId,
              role: decoded.role || 'user',
              name: decoded.name || decoded.username || '',
              email: decoded.email || ''
            };
            
            setAuthState({
              user: userData,
              token: storedToken,
              loading: false
            });
          }
        } catch (error) {
          console.error("Auth initialization error:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setAuthState({ user: null, token: null, loading: false });
        }
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SECRET_URL}/api/account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
         const text = await response.text();
         let errorMessage = "Login failed";
      }

      const data = await response.json();
      const { token } = data;
      
      if (!token) {
        throw new Error("Token not received from server.");
      }

      // Decode token to get user information
      const decoded = jwtDecode(token);
      
      // Prefer server-provided user data if available
      const userData = data.user || {
        id: decoded.sub || decoded.id || decoded.userId,
        role: decoded.role || 'user',
        email: decoded.email || email
      };

      // Update state and storage
      setAuthState({
        user: userData,
        token: token,
        loading: false
      });
      
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      toast.success("Login successful");
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Authentication failed");
      return { success: false, message: error.message };
    }
  }, []);

  // Logout handler
  const logout = useCallback(() => {
    setAuthState({ user: null, token: null, loading: false });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout successful");
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    if (!authState.user) return false;
    return authState.user.role === role;
  }, [authState.user]);

  // Check authentication status
  const isAuthenticated = useCallback(() => {
    if (!authState.token) return false;
    
    try {
      const decoded = jwtDecode(authState.token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }, [authState.token]);

  // Context value
  const contextValue = {
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
    isAdmin: hasRole('admin'),
    isUser: hasRole('user')
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!authState.loading && children}
    </AuthContext.Provider>
  );
}