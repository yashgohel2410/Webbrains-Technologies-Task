const express = require("express");
const employee = require("../model/employee");
const router = express.Router();

// Generate QR code for a car number and save it in the database
router.post("/signUp", async (req, res) => {
  console.log("here", { req });
  const { firstName, lastName, phone, email, workHours, salaryType, salary } =
    req.body;
  const firstNameDigit = firstName.slice(0, 4);
  const phoneNoDigit = phone.slice(-4);

  const LoginId = firstNameDigit + phoneNoDigit;

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
      Password: LoginId,
    });
    console.log({ newEmployee });
    await newEmployee.save();
    res
      .status(200)
      .json({ success: true, message: "Employee registered successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to Register the Employee" });
  }
});

// Retrieve car details using the scanned QR code
router.get("/getEmployeeDetails", async (req, res) => {
  try {
    const data = await employee.find();
    if (!data) {
      return res.status(404).json({ success: false, error: "Car not found" });
    }
    res.json({ success: true, data: data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve car details" });
  }
});

module.exports = router;
