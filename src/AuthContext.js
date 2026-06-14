// src/AuthContext.js
import { createContext, useContext, useState } from "react";

// Global authentication state, mirrored on the same pattern as your CartContext.
const AuthContext = createContext();
const STORAGE_KEY = "eztech_user";

export function AuthProvider({ children }) {
  // Lazy initializer: read any saved session from localStorage on first load
  // so a verified user stays signed in across page refreshes.
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  // Called after a successful Google sign in.
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  // Clears the session everywhere.
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook so components can call useAuth() instead of useContext.
export function useAuth() {
  return useContext(AuthContext);
}