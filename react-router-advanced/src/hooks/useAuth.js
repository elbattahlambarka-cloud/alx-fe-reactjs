// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

// Custom hook to simulate authentication
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for auth status
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Function to login
  const login = (username) => {
    const userData = { username, role: 'user', id: Date.now() };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  // Function to check auth status
  const checkAuth = () => {
    return isAuthenticated;
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
}