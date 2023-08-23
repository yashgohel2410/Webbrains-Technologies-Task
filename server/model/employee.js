const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  workHours: { type: String },
  salaryType: { type: String, required: true },
  salary: { type: Number, required: true },
  LoginId: { type: String, required: true },
  Password: { type: String, required: true },
  department: { type: String, required: true },
});

module.exports = mongoose.model("employee", employeeSchema);
