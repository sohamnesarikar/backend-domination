import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", createTask);
router.get("/", getAllTasks);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
