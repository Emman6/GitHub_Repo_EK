import React, { createContext, useState, useContext } from 'react';

// Initialize context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. STATE MANAGEMENT
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // New state to hold the specific user data (like their role)
  const [user, setUser] = useState(null);

  // 2. AUTHENTICATION METHODS
  const login = (token, email) => {
    setIsAuthenticated(true);
    
    // BACKEND SIMULATION:
    // In a full application, the backend API would send back the user's role 
    // inside the decoded JWT token. For now, we simulate this by checking the email.
    let assignedRole = 'User';
    if (email.includes('admin')) {
      assignedRole = 'Admin';
    }

    setUser({
      email: email,
      role: assignedRole
    });
    
    // Persist token in local storage so it survives page reloads
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the auth context easily
export const useAuth = () => useContext(AuthContext);