import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import { useUser } from './UserContext';
import Deposit from './deposit';
import Withdraw from './withdraw';
import AllData from './alldata';

function ProtectedRoutes() {
  const location = useLocation();
  const { currentUser } = useUser();

  if (!currentUser) {
    // If user is not logged in, redirect to login page with attempted page stored in the state
    return <Navigate to="/login" state={{ attemptedPage: location.pathname }} />;
  }

  return (
    <Routes>
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/alldata" element={<AllData />} />
    </Routes>
  );
}

export default ProtectedRoutes;
