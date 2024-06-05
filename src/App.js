import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './navbar';
import { UserProvider } from './UserContext';
import { AuthProvider } from './AuthProvider';
import Home from './home';
import CreateAccount from './createaccount';
import Login from './login';
import Deposit from './deposit';
import Withdraw from './withdraw';
import Balance from './balance';
import AllData from './alldata';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

function Spa() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider> {/* Wrap entire application with AuthProvider */}
          <NavBar />
          <UserProvider>
            <div className="container" style={{ padding: "20px" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createaccount" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/balance" element={<Balance />} />
                <Route path="/alldata" element={<AllData />} />
              </Routes>
            </div>
          </UserProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<Spa />);
