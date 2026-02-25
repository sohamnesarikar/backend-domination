import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", createEmployee);
router.delete("/:id", deleteEmployee);
router.put("/:id", updateEmployee);

export default router;
