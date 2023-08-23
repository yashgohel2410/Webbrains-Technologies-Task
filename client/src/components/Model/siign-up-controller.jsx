import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

const SignUpController = ({ onRequestClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    salary: 0,
    workHours: 0,
    salaryType: "select-one",
    department: "",
  });

  const [firstErrorFieldName, setFirstErrorFieldName] = useState("");
  const firstErrorFieldRef = useRef(null);

  const calculateSalary = () => {
    const { salaryType, salary, workHours } = formData;

    if (salaryType === "1") {
      return workHours * salary; // Hourly wage
    } else if (salaryType === "2") {
      return salary; // Fixed monthly salary
    } else if (salaryType === "3") {
      return workHours > 100 ? salary : 0.75 * salary; // Hours-based calculation
    }

    return 0;
  };
  useEffect(() => {
    if (firstErrorFieldName && firstErrorFieldRef.current) {
      firstErrorFieldRef.current.focus();
    }
  }, [firstErrorFieldName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setFirstErrorFieldName("");

    //Checking is any field is empty or not
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.department ||
      !formData.salaryType
    ) {
      toast.error("Please fill in all required fields");
      const firstErrorField = [
        "firstName",
        "lastName",
        "phone",
        "salaryType",
      ].find((field) => !formData[field]);
      if (firstErrorField) {
        setFirstErrorFieldName(firstErrorField);
      }
      return;
    }

    const calculatedSalary = calculateSalary();
    const employeeData = {
      ...formData,
      salary: calculatedSalary,
    };

    try {
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("New Employee Added");
        onRequestClose();
      } else {
        console.error("Registration Failed");
      }
    } catch (error) {
      toast.error("Can't add New Employee");
    }
  };

  return {
    handleSubmit,
    formData,
    handleChange,
    firstErrorFieldName,
    firstErrorFieldRef,
  };
};

export default SignUpController;
