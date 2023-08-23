import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DashBoardController = () => {
  const { department } = useParams();
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchEmployeeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // Get Filter Employee Data
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(
        `/api/getEmployeesByDepartment/${department}`
      );
      const data = response.data;
      if (data.success) {
        setEmployeeData(data.data);
      } else {
        toast.error("Failed to fetch employee data");
      }
    } catch (error) {
      toast.error("Error while fetching employee data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  // Add new Employee
  const addEmployee = () => {
    setIsSignUpModalOpen(true);
  };
  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  //Edit existing Employee
  const onEdit = (employeeId) => {
    const employeeToEdit = employeeData.find(
      (employee) => employee._id === employeeId
    );
    setSelectedEmployee(employeeToEdit);
  };
  const handleEditModalClose = () => {
    setSelectedEmployee(null);
  };

  //Delete Employee
  const onDelete = (employeeId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (shouldDelete) {
      axios
        .delete(`/api/deleteEmployee/${employeeId}`)
        .then((response) => {
          toast.success("Employee deleted successfully:");
          fetchEmployeeData();
        })
        .catch((error) => {
          toast.error("Failed to delete employee:");
        });
    }
  };

  return {
    employeeData,
    loading,
    onEdit,
    onDelete,
    addEmployee,
    selectedEmployee,
    handleEditModalClose,
    isSignUpModalOpen,
    closeSignUpModal,
  };
};

export default DashBoardController;
