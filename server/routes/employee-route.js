const express = require("express");
const employee = require("../model/employee");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");

// Joi schema for request body validation
const employeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  workHours: Joi.number().required(),
  salaryType: Joi.string().valid("1", "2", "3").required(),
  salary: Joi.number().required(),
  department: Joi.string().required(),
});

// Generate Employee Query
router.post("/signUp", async (req, res) => {
  // Validate request body using the schema
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }


  const {
    firstName,
    lastName,
    phone,
    email,
    workHours,
    salaryType,
    salary,
    department,
  } = req.body;

  const firstNameDigit = firstName.slice(0, 4);
  const phoneNoDigit = phone.slice(-4);

  const LoginId = firstNameDigit + phoneNoDigit;
  const hashedPassword = await bcrypt.hash(LoginId, 10);

  try {
    const newEmployee = new employee({
      firstName,
      lastName,
      phone,
      email,
      workHours,
      salaryType,
      salary,
      LoginId,
      Password: hashedPassword,
      department,
    });
    await newEmployee.save();
    res.status(200).json({
      success: true,
      message: "Employee registered successfully",
      hashedPassword: hashedPassword,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to Register the Employee" });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await employee.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.Password);
      if (passwordMatch) {
        // Successful login
        res.status(200).json({ message: "Login successful",user:user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Route for getting all users list
  router.get("/users", async (req, res) => {
    try {
      const users = await employee.find();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to retrieve users" });
    }
  });
 
  // Route to Update the employee
  router.put("/updateEmployee/:id", async (req, res) => {
    const employeeId = req.params.id;
  
    try {
      const updatedEmployee = await employee.findByIdAndUpdate(
        employeeId,
        req.body,
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
      res.status(200).json({ success: true, message: "Employee updated successfully", data: updatedEmployee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to update employee" });
    }
  });

  //Route to delete the employee
  router.delete("/deleteEmployee/:id", async (req, res) => {
    const employeeId = req.params.id;
  
    try {
      const deletedEmployee = await employee.findByIdAndDelete(employeeId);
  
      if (!deletedEmployee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
  
      res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to delete employee" });
    }
  });
  
  //Route to getEmployee by Department
  router.get("/getEmployeesByDepartment/:department", async (req, res) => {
    const targetDepartment = req.params.department;
  
    try {
      const employees = await employee.find({ department: targetDepartment });
      res.json({ success: true, data: employees });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to retrieve employees" });
    }
  });
  
module.exports = router;
