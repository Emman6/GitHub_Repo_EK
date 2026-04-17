import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context to share authentication state across the app
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ── STATE MANAGEMENT ──
  // isAuthenticated: Tracks if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // user: Stores the details (email, username, role) of the logged-in individual
  const [user, setUser] = useState(null);
  // loading: Ensures the app doesn't redirect before checking LocalStorage
  const [loading, setLoading] = useState(true);

  // ── PERSISTENCE CHECK ──
  // This runs once when the app starts to see if a user was already logged in
  useEffect(() => {
    const savedToken = localStorage.getItem('walletwise_token');
    const savedUser = localStorage.getItem('walletwise_current_user');
    
    if (savedToken && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // ── LOGIN METHOD ──
  // I updated this to accept one 'userData' object to match Login.jsx
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    
    // Save to LocalStorage so the user stays logged in after a refresh
    localStorage.setItem('walletwise_token', 'session_' + Date.now());
    localStorage.setItem('walletwise_current_user', JSON.stringify(userData));
  };

  // ── LOGOUT METHOD ──
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('walletwise_token');
    localStorage.removeItem('walletwise_current_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {/* We only render the app once the persistence check is done */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to auth data in other components
export const useAuth = () => useContext(AuthContext);