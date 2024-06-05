import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser hook to access currentUser
import './index.css'; 

function NavBar() {
  // Get currentUser and logoutUser from UserContext
  const { currentUser, logoutUser } = useUser();

  // Get the current location using the useLocation hook
  const location = useLocation();

  // State to manage the collapsed state of the navbar
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to toggle the collapsed state of the navbar
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to determine if the link is active (matches the current route)
  const isLinkActive = (path) => location.pathname === path;

  // Function to handle logout
  const handleLogout = () => {
    // Call logoutUser function from UserContext
    logoutUser();
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/" title="Navigate to the home page.">
            <img
              src="/images/bank.png"
              alt="Bank Logo"
              style={{ width: '40px', height: '40px', marginRight: '10px' }}
            />
            BAD BANK
          </NavLink>

          <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {/* Always display these links */}
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${isLinkActive('/') ? 'active' : ''}`}
                  exact="true"
                  to="/"
                  title="Navigate to the home page."
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${isLinkActive('/createaccount') ? 'active' : ''}`}
                  to="/createaccount/"
                  title="Click here to create a new account."
                >
                  Create Account
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${isLinkActive('/deposit') ? 'active' : ''}`}
                  to="/deposit/"
                  title="Access the deposit page to add funds to your account."
                >
                  Deposit
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${isLinkActive('/withdraw') ? 'active' : ''}`}
                  to="/withdraw/"
                  title="Visit the withdrawal page to withdraw funds from your account."
                >
                  Withdraw
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${isLinkActive('/alldata') ? 'active' : ''}`}
                  to="/alldata/"
                  title="Explore data related to all accounts."
                >
                  All Data
                </NavLink>
              </li>

              {/* Conditionally render the login/logout link based on user's login state */}
              {currentUser ? (
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${isLinkActive('/login') ? 'active' : ''}`}
                    to="/login/"
                    title="Click here to log in."
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Alert Message */}
      {currentUser && (

<div className="alert container">
  Welcome, <strong>{currentUser.name}</strong>! You are logged in.</div>



      )}
    </>
  );
}

export default NavBar;
