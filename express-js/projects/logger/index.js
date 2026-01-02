import express from "express";
import { writeFile } from "./utils/file-operation.js";
import userRoutes from "./routes/user.route.js";
import logsRoutes from "./routes/log.route.js";

const app = express();

app.use(express.json());

// logger middleware
app.use((req, res, next) => {
  const date = new Date().toISOString();
  const log = `${req.method} ${req.url} ${date}\n`;
  writeFile("./logs/logs.log", log);
  next();
});

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/logs", logsRoutes);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
