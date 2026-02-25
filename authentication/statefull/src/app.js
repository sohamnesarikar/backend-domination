import express from "express";
import session from "express-session";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

dotenv.config();

export const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
