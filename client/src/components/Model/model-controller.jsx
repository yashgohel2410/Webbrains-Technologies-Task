import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const ModalController = ({ employee, onRequestClose }) => {
  const [formData, setFormData] = useState({
    firstName: employee.firstName || "",
    lastName: employee.lastName || "",
    phone: employee.phone || "",
    email: employee.email || "",
    department: employee.department || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Update employee details

  const handleSave = () => {
    axios
      .put(`/api/updateEmployee/${employee._id}`, formData)
      .then(() => {
        toast.success("Employee updated successfully:");
        onRequestClose();
      })
      .catch(() => {
        toast.error("Failed to update employee:");
      });
  };
  return {
    handleChange,
    handleSave,
    formData,
  };
};

export default ModalController;
