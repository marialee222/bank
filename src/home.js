import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container mt-5 container-mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card custom-bg-color text-white" style={{ backgroundColor: 'transparent' }}>
            <div className="card-body text-center">Bad Bank</div>
            <div className="card-body text-center">
              <h3 className="card-title">Welcome to <br/>Your Financial Hub</h3>
              <p className="card-text">You can move around using the navigation bar.</p>
              <img src="/images/bank.png" className="img-fluid" alt="Responsive bank" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
