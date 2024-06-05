import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { UserContext } from './UserContext';

function AllData() {
  const ctx = useContext(UserContext);
  const [userData, setUserData] = useState(ctx.users);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  useEffect(() => {
    // Check if currentUser is not null
    if (ctx.currentUser !== null) {
      setIsLoggedIn(true); // Set isLoggedIn to true if user is logged in
    }
  }, [ctx.currentUser]);

  const clearUserData = () => {
    setUserData([]);
  };

  // Redirect to login page if user is not logged in
  if (!isLoggedIn) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card custom-bg-color" style={{ backgroundColor: 'transparent' }}>
              <div className="card-body">
                <h5 className="card-title text-left text-light">ALL DATA</h5>
                <p className="card-text text-center">Please <Link to="/login">log in</Link> to access all data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mt-5 card soft-bg all-data-container">
      <Card className="vip-table">
        <Card.Header>
          <h2 className="mb-4">ALL DATA</h2>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {userData && userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="danger" onClick={clearUserData}>Clear</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default AllData;
