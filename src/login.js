import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BankForm from './BankForm';
import { UserContext } from './UserContext';

function Login() {
  const { loginUser, setSuccessMessage } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const { email, password } = formData;
    const isLoginSuccessful = loginUser(email, password);
  
    if (isLoginSuccessful) {
      console.log('Login successful.');
      setShowErrorMessage(false);
      setSuccessMessage('Login successful.');
      setFormData({ email: '', password: '' });
      // Redirect to the dashboard or any other page upon successful login
      navigate('/dashboard');
    } else {
      console.log('Invalid email or password. Please try again.');
      setShowErrorMessage(true);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setIsFormFilled(true); // Update isFormFilled state
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card custom-bg-color">
            <div className="card-body">
              <h5 className="card-title text-white">LOGIN</h5>
              {showErrorMessage && <div className="alert alert-danger">Invalid email or password. Please try again.</div>}
              <BankForm
                label="Your Information"
                fields={['email', 'password']} // Pass only email and password fields
                handle={handleSubmit}
                submitButtonLabel="Login"
                formData={formData}
                widthClass="col-md-12"
                setFormData={setFormData}
                handleInputChange={handleInputChange}
                isFormFilled={isFormFilled} // Pass isFormFilled state
                setIsFormFilled={setIsFormFilled} // Pass setIsFormFilled function
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
