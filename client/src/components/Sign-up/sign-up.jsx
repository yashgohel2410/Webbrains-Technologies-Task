import React, { useState } from "react";
import "./SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    salary: 0,
    phone: "",
    email: "",
    password: "",
    workHours: "",
    salaryType: "",
  });

  const calculateSalary = () => {
    const { salaryType, salary, workHours } = formData;

    if (salaryType === "1") {
      console.log("1", workHours * salary);
      return workHours * salary; // Hourly wage
    } else if (salaryType === "2") {
      console.log("2", salary);
      return salary; // Fixed monthly salary
    } else if (salaryType === "3") {
      console.log("3", workHours > 100 ? salary : 0.75 * salary);
      return workHours > 100 ? salary : 0.75 * salary; // Hours-based calculation
    }

    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.salaryType
    ) {
      toast.error("Please fill in all required fields");
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
        toast.success("Employee registered successfully");
      } else {
        console.error("Registration Failed");
      }
    } catch (error) {
      toast.error("Failed to register employee"); // Show error toast
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name *"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name *"
        />
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number  *"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email *"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password *"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Re-Enter Password *"
        />
        <select
          name="salaryType"
          value={formData.salaryType}
          onChange={handleChange}
        >
          <option value='select-one' disabled   >Select One</option>  
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
          />
        )}
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary  *"
        />
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SignUp;
