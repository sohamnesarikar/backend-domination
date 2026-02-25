import path from "node:path";
import { fileURLToPath } from "node:url";
import empData from "../data/emp.json" with { type: "json" };
import { fileWrite } from "../utils/fileOperations.js";

let employees = empData || [];

// Get current file Path
const __fileName = fileURLToPath(import.meta.url);

// Get current directory path
const __dirname = path.dirname(__fileName);

const empFilePath = path.join(__dirname, "..", "data", "emp.json");

const getEmployees = (req, res) => {
  res.send(employees);
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, salary, designation, isActive } = req.body;

    if (!name || !salary || !email || !designation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newEmployee = {
      id: crypto.randomUUID(),
      name,
      email,
      salary,
      designation,
      isActive,
    };

    employees.push(newEmployee);
    await fileWrite(empFilePath, employees);
    res.json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getEmployee = (req, res) => {
  const { id } = req.params;
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });
  }

  res.json({ success: true, data: employee });
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const index = employees.findIndex((emp) => emp.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    employees.splice(index, 1);
    await fileWrite(empFilePath, employees);
    res.json({ success: true, message: "employee deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, salary, designation, isActive } = req.body;

    if (!name || !salary || !email || !designation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const index = employees.findIndex((emp) => emp.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    employees[index] = {
      id,
      name,
      email,
      salary,
      designation,
      isActive,
    };

    await fileWrite(empFilePath, employees);

    res.json({ success: true, data: employees[index] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export {
  getEmployees,
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
};
