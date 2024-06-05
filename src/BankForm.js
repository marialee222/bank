import React, { useState, useEffect } from 'react';

function BankForm({ label, fields, handle, submitButtonLabel, formData, setFormData, widthClass, formType, isFormFilled, setIsFormFilled }) {
  const [status, setStatus] = useState('');
  const [formActivated, setFormActivated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Effect code here
  }, [setFormData]);

  function handleInputChange(field, value) {
    setFormData(prevData => ({ ...prevData, [field]: value }));
    setStatus('');
    if (!formActivated) {
      setFormActivated(true);
    }
    // Update isFormFilled state based on user input
    if (!isFormFilled && value.trim() !== '') {
      setIsFormFilled(true);
    }
  }

  function handleSubmit() {
    const areFieldsValid = validateForm(formData);
    if (areFieldsValid) {
      const success = handle(formData);
      if (success) {
        setSuccessMessage('Success: Form submitted successfully.');
      }
    }
  }
  
  function validateForm(formData) {
    let isValid = true;
  
    for (const field of fields) {
      // Check for name field if it's included in the fields array
      if (fields.includes('name') && field === 'name') {
        if (!formData.name || !formData.name.trim()) {
          console.log('Validating name field...');
          setStatus('Please enter your name.');
          isValid = false;
          break; // Exit loop early if name field is not filled
        } else {
          console.log('Name field is valid.');
        }
      }
  
      // Check for email field if it's included in the fields array
      if (fields.includes('email') && field === 'email') {
        if (!formData.email) {
          console.log('Validating email field...');
          setStatus('Please enter your email address.');
          isValid = false;
          break; // Exit loop early if email field is not filled
        } else {
          console.log('Email field is valid.');
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            console.log('Email address is invalid.');
            setStatus('Please enter a valid email address.');
            isValid = false;
            break; // Exit loop early if email address is invalid
          }
        }
      }
  
      // Check for password field if it's included in the fields array
      if (fields.includes('password') && field === 'password') {
        if (!formData.password) {
          console.log('Validating password field...');
          setStatus('Please enter a password.');
          isValid = false;
          break; // Exit loop early if password field is not filled
        } else if (formData.password.length < 8) {
          console.log('Password is too short.');
          setStatus('Password must be at least 8 characters long.');
          isValid = false;
          break; // Exit loop early if password is too short
        }
      }
  
      // Additional validation for create account form
      if (formType === 'createAccount') {
        // Check for re-enter password field if it's included in the fields array
        if (fields.includes('reEnterPassword') && field === 'reEnterPassword') {
          if (!formData.reEnterPassword) {
            console.log('Validating re-enter password field...');
            setStatus('Please re-enter your password.');
            isValid = false;
            break; // Exit loop early if re-enter password field is not filled
          } else if (formData.password !== formData.reEnterPassword) {
            console.log('Passwords do not match.');
            setStatus('Passwords do not match.');
            isValid = false;
            break; // Exit loop early if passwords do not match
          }
        }
      }
    }
  
    // All fields are valid
    return isValid;
  }
  
  // Helper function to get field name with proper casing
  function getFieldName(field) {
    return field === 'reEnterPassword' ? 'Re-enter Password' : field.charAt(0).toUpperCase() + field.slice(1);
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className={`col-md-6 ${widthClass}`}>
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">{label}</h5>
              {status && <div className="alert alert-danger">{status}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <form>
                {fields.map(field => (
                  <div key={field} className="form-group">
                    <input
                      type={field === 'password' ? 'password' : 'text'}
                      className="form-control"
                      placeholder={getFieldName(field)}
                      value={formData[field] || ''}
                      onChange={e => handleInputChange(field, e.target.value)}
                      disabled={false}
                    />
                  </div>
                ))}
                <div className="text-right">
                  <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!isFormFilled}>{submitButtonLabel}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankForm;
