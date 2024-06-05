import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BankForm from './BankForm';
import { UserContext } from './UserContext';

function Deposit() {
  const ctx = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [balance, setBalance] = useState(0);
  const [formData, setFormData] = useState({ amount: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState('');
  const { updateUserBalance } = useContext(UserContext);
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    if (ctx.currentUser) {
      const userBalance = ctx.currentUser.balance || 0;
      setBalance(userBalance);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [ctx.currentUser]);

  function handleDeposit(data) {
    if (!isLoggedIn) {
      setErrorMessage('Please log in to deposit.');
      return;
    }

    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid positive number.');
      return;
    }

    const newBalance = balance + amount;
    updateUserBalance(ctx.currentUser.id, newBalance);
    setTransactionMessage(`Deposit of $${amount.toFixed(2)} USD successful!`);
    setFormData({ ...formData, amount: '' });
    setBalance(newBalance);
    setErrorMessage('');
    setIsFormFilled(false); // Reset isFormFilled state
    setTimeout(() => {
      setTransactionMessage('');
    }, 3000); // Hide the message after 3 seconds
  }

  return (
    <div className="container mt-5 container-mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card custom-bg-color" style={{ backgroundColor: 'transparent' }}>
            <div className="card-body">
              <h5 className="card-title text-white">DEPOSIT</h5>
              <div className="d-flex justify-content-between align-items-center">
                <p className="card-text mb-0 text-white">Balance:</p>
                <p className="card-text mb-0 text-white">${balance.toFixed(2)} USD</p>
              </div>
              {errorMessage && <div className="alert alert-danger error-message">{errorMessage}</div>}
              {transactionMessage && <div className="alert alert-success success-message">{transactionMessage}</div>}
            </div>
          
            <div className="bank-form-container">
              {isLoggedIn ? (
                <BankForm
                  bgcolor="success"
                  label="Deposit Amount"
                  fields={['amount']}
                  handle={handleDeposit}
                  submitButtonLabel="Deposit"
                  successButtonLabel="Deposit Another Amount"
                  formData={formData}
                  setFormData={setFormData}
                  widthClass="col-md-10"
                  setIsFormFilled={setIsFormFilled} 
                  isFormFilled={isFormFilled} 
                />
              ) : (
                <p className="text-center">Please <Link to="/login">log in</Link> to deposit.</p>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
