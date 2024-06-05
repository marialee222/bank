import React from 'react';
import { useUser } from './UserContext';

const Layout = ({ children }) => {
  const { currentUser } = useUser(); // Destructure currentUser from useUser hook

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Your Website</span>
          {currentUser && (
            <span className="navbar-text">
              Welcome! You are logged in as {currentUser.email}.
            </span>
          )}
        </div>
      </nav>

      {/* Alert */}
      {currentUser && (
        <div className="alert alert-success text-center mb-0" role="alert">
          Welcome! You are logged in as {currentUser.email}.
        </div>
      )}

      {/* Main content */}
      <div className="container mt-3">{children}</div>
    </div>
  );
};

export default Layout;
