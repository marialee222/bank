import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', balance: 0 },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password456', balance: 0 },
    { id: 3, name: 'Alice Smith', email: 'alice@example.com', password: 'password789', balance: 0 },
    { id: 4, name: 'Bob Smith', email: 'bob@example.com', password: 'passwordabc', balance: 0 },
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  const [transactionMessage, setTransactionMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle user login
  const loginUser = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('Login successful:', user);
      setCurrentUser(user);
      setSuccessMessage('Login successful.');
      return true;
    } else {
      console.log('Invalid email or password. Please try again.');
      return false;
    }
  };

  // Function to handle user logout
  const logoutUser = () => {
    setCurrentUser(null);
  };

  // Function to update user's balance
  const updateUserBalance = (userId, newBalance) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, balance: newBalance } : user
      )
    );

    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prevUser => ({ ...prevUser, balance: newBalance }));
    }
  };

  // Function to handle success messages
  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };

  // Function to add new submissions (new accounts)
  const addSubmission = (userData) => {
    setUsers(prevUsers => [...prevUsers, userData]);
  };

  // Context value that will be provided to all consumers
  const value = {
    users,
    currentUser,
    loginUser,
    logoutUser,
    updateUserBalance,
    addSubmission,
    transactionMessage,
    successMessage,
    clearSuccessMessage,
    setSuccessMessage // Include setSuccessMessage in the context value
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
