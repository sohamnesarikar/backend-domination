import express from "express";
import { downloadLogs, getAllLogs } from "../controllers/log.controller.js";

const router = express.Router();

router.get("/", getAllLogs);
router.get("/download", downloadLogs);

export default router;
