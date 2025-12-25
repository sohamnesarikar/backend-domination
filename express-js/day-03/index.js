import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({});

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.get("/set-cookie", (req, res) => {
  res.cookie("username", "soham", {
    signed: true,
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
  res.cookie("theme", "dark", {
    signed: true,
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
  res.send("Cookie has been sent");
});

app.get("/get-cookie", (req, res) => {
  // const rawCookies = req.headers.cookie;   Bad Approach
  const cookies = req.signedCookies;
  console.log(cookies);
  res.json(cookies);
});

app.get("/remove-cookies", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("theme");
  res.send("Cookies has been cleared");
});

app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
