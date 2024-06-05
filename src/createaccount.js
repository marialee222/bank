import React, { useState, useContext } from 'react';
import BankForm from './BankForm';
import { UserContext } from './UserContext';
import './index.css';

function CreateAccount() {
  const fields = ['name', 'email', 'password', 'reEnterPassword'];
  const ctx = useContext(UserContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', reEnterPassword: '' });
  const [formVisible, setFormVisible] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  // Initialize isFormFilled as false
  const [isFormFilled, setIsFormFilled] = useState(false);

  function handleSubmit(formData) {
    const { name, email, password, reEnterPassword } = formData;

    if (password !== reEnterPassword) {
      setPasswordMatchError(true);
      return;
    }

    console.log('Form submission successful.');
    ctx.addSubmission({ name, email, password });
    setFormData({ name: '', email: '', password: '', reEnterPassword: '' });
    setFormSubmitted(true);
    setIsFormFilled(false);
    setShowSuccessMessage(true);
    setPasswordMatchError(false);
  }

  function handleSuccessButtonClick() {
    setFormVisible(true);
    setFormSubmitted(false);
    setIsFormFilled(false);
    setShowSuccessMessage(false);
  }

  function handleInputChange(field, value) {
    setFormData({ ...formData, [field]: value });
    // Update isFormFilled state based on user input
    if (!isFormFilled && value.trim() !== '') {
      setIsFormFilled(true);
    }
  }

  function handleModalDrag(event) {
    const modal = document.getElementById('successModal');
    const startX = event.pageX - modal.offsetLeft;
    const startY = event.pageY - modal.offsetTop;

    function move(event) {
      modal.style.top = (event.pageY - startY) + 'px';
      modal.style.left = (event.pageX - startX) + 'px';
    }

    function up() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  return (
    <div className="container mt-5 container-mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card custom-bg-color" style={{ backgroundColor: 'transparent' }}>
            <div className="card-body">
              <h5 className="card-title text-white">CREATE ACCOUNT</h5>
              {formVisible && (
                <React.Fragment>
                  {passwordMatchError && <div className="alert alert-danger">Passwords do not match.</div>}
                  <BankForm
                    bgcolor="primary"
                    label="Your Information"
                    fields={fields}
                    handle={handleSubmit}
                    submitButtonLabel={formSubmitted ? "Add Another Account" : "Create Account"}
                    successButtonLabel="Add Another Account"
                    formData={formData}
                    setFormData={setFormData}
                    errors={{}}
                    onSuccessButtonClick={handleSuccessButtonClick}
                    widthClass="col-md-12"
                    handleInputChange={handleInputChange}
                    setIsFormFilled={setIsFormFilled}
                    isFormFilled={isFormFilled}
                    formType="createAccount"
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Bootstrap Modal for Success Message */}
      <div id="successModal" className={`modal fade ${showSuccessMessage ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSuccessMessage ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-moveable" role="document" onMouseDown={handleModalDrag}>
          <div className="modal-content modal-content-3d">
            <div className="modal-header" style={{ textAlign: 'center' }}>
              <h5 className="modal-title">Account Created Successfully!</h5>
              <button type="button" className="btn-close" onClick={() => setShowSuccessMessage(false)}></button>
            </div>
            <div className="modal-body">
              <p>You can add another account or log in to start enjoying our services. Thank you for choosing Bad Bank.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => setShowSuccessMessage(false)}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
