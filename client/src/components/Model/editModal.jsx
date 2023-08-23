import React from "react";
import Modal from "react-modal";
import ModalController from "./model-controller";

const EditEmployeeModal = ({ isOpen, onRequestClose, employee }) => {
  const { handleChange, handleSave, formData } = ModalController({ employee ,onRequestClose});

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-container"
      overlayClassName="modal-overlay"
      contentLabel="Edit Employee"
    >
      <div className="modal-content">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSave}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label>Phone No</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="button" onClick={onRequestClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditEmployeeModal;
