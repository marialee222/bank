import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const loginUser = (user) => {
    setCurrentUser(user);
    // Persist user's authentication status in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    // Remove user's authentication status from localStorage
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
