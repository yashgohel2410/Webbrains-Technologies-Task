import React from "react";
import DashBoardController from "./dashboard-controller";
import { ToastContainer } from "react-toastify";
import { EditEmployeeModal, SignUpModal } from "../Model";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css"; 
import "./modal.css";

const Dashboard = () => {
  const {
    employeeData,
    addEmployee,
    onEdit,
    onDelete,
    selectedEmployee,
    handleEditModalClose,
    isSignUpModalOpen,
    closeSignUpModal
  } = DashBoardController();

  return (
    <div className="dashboard">
      <h2>Employee List</h2>
      <td>
        <button onClick={() => addEmployee()}>Add Employee</button>
      </td>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => onEdit(employee._id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => onDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
          <SignUpModal
            isOpen={isSignUpModalOpen}
            onRequestClose={closeSignUpModal}
          />

          {selectedEmployee && (
            <EditEmployeeModal
              isOpen={!!selectedEmployee}
              employee={selectedEmployee}
              onClose={handleEditModalClose}
            />
          )}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Dashboard;
