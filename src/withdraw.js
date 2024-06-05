import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BankForm from './BankForm';
import { UserContext } from './UserContext';

function Withdraw() {
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

  function handleWithdraw(data) {
    setErrorMessage('');

    if (!isLoggedIn) {
      setErrorMessage('Please log in before withdrawing.');
      return;
    }

    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid positive number for withdrawal.');
      return;
    }
    if (amount > balance) {
      setErrorMessage('Insufficient Funds: You do not have enough funds to process this withdrawal request. Please ensure sufficient funds are available before attempting to withdraw.');
      return;
    }

    const newBalance = balance - amount;
    updateUserBalance(ctx.currentUser.id, newBalance);
    setTransactionMessage(`Withdrawal of $${amount.toFixed(2)} USD successful!`);
    setFormData({ ...formData, amount: '' });
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
              <h5 className="card-title text-white">WITHDRAW</h5>
              <div className="d-flex justify-content-between align-items-center">
                <p className="card-text mb-0 text-white">Balance:</p>
                <p className="card-text mb-0 text-white">${balance.toFixed(2)} USD</p>
              </div>
              {errorMessage && <div className="alert alert-danger error-message">{errorMessage}</div>}
              {transactionMessage && <div className="alert alert-success success-message">{transactionMessage}</div>}
            </div>
            <div>
              {isLoggedIn ? (
                <BankForm
                  bgcolor="info"
                  label="Withdraw Amount"
                  fields={['amount']}
                  handle={handleWithdraw}
                  submitButtonLabel="Withdraw"
                  successButtonLabel="Withdraw Another Amount"
                  formData={formData}
                  setFormData={setFormData}
                  widthClass="col-md-10"
                  isFormFilled={isFormFilled}
                  setIsFormFilled={setIsFormFilled}
                />
              ) : (
                <p className="text-center">Please <Link to="/login">log in</Link> to withdraw.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
