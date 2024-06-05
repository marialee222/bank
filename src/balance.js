import React from 'react';
import BankForm from './BankForm'; // Make sure to import BankForm from its correct path

function Balance() {

  function handle(data) {
    // Logic for handling balance inquiry
    console.log('Checking balance for:', data);
    return true; // Assuming balance inquiry is successful
  }

  const fields = []; // No fields needed for balance inquiry

  return (
    <BankForm
      bgcolor="primary"
      label="Check Balance"
      fields={fields}
      handle={handle}
      successButton="Check Another Account"
    />
  );
}

export default Balance;
