import React from "react";
import Modal from "react-modal";
import SignUpController from "./siign-up-controller";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpModal = ({ isOpen, onRequestClose }) => {

  const {
    handleSubmit,
    formData,
    handleChange,
    firstErrorFieldName,
    firstErrorFieldRef,
  } = SignUpController({ onRequestClose });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-container"
      overlayClassName="modal-overlay"
      contentLabel="Sign Up"
    >
      <div className="modal-content">
        <div className="signup-form">
          <h2>Create New User</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name *"
              ref={
                firstErrorFieldName === "firstName" ? firstErrorFieldRef : null
              }
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name *"
              ref={
                firstErrorFieldName === "lastName" ? firstErrorFieldRef : null
              }
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              ref={firstErrorFieldName === "email" ? firstErrorFieldRef : null}
            />
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number  *"
              ref={
                firstErrorFieldName === "lastName" ? firstErrorFieldRef : null
              }
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department *"
              ref={
                firstErrorFieldName === "department" ? firstErrorFieldRef : null
              }
            />
            <select
              name="salaryType"
              value={formData.salaryType}
              onChange={handleChange}
              ref={
                firstErrorFieldName === "salaryType" ? firstErrorFieldRef : null
              }
            >
              <option value="select-one" disabled>
                Select One
              </option>
              <option value="1">Hourly Wage</option>
              <option value="2">Fixed Monthly</option>
              <option value="3">Hours-based</option>
            </select>
            {(formData.salaryType === "1" || formData.salaryType === "3") && (
              <input
                type="number"
                name="workHours"
                value={formData.workHours}
                onChange={handleChange}
                placeholder="Work Hours *"
                ref={
                  firstErrorFieldName === "workHours"
                    ? firstErrorFieldRef
                    : null
                }
              />
            )}
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary  *"
              ref={firstErrorFieldName === "salary" ? firstErrorFieldRef : null}
            />
            <div className="modal-buttons">
              <button type="button" onClick={onRequestClose}>
                Cancel
              </button>
              <button type="submit">Create New User</button>
            </div>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
          />
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
