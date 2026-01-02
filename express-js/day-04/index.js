import express from "express";
import session from "express-session";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // 3 hours
    },
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(3000, () => {
  console.log(`server is listening on http://localhost:3000`);
});
