import { usersData } from "../utils/data.js";
import crypto from "crypto";

const users = usersData;

export const getAllUsers = (req, res) => {
  res.json(users);
};

export const getUser = (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res
      .status(400)
      .json({ success: false, error: true, message: "Invalid Id" });
  }

  res.send({ success: true, data: user });
};

export const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Please provide all the fields",
    });
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
  };

  users.push(user);

  res.send({ success: true, message: "User created Successfully", data: user });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id === id);

  if (!index) {
    return res
      .status(400)
      .json({ success: false, error: true, message: "Invalid Id" });
  }

  users.splice(index, 1);

  res.json({ success: true, message: "User deleted Successfully" });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Please provide all the fields",
    });
  }

  const index = users.findIndex((user) => user.id === id);

  if (!index) {
    return res
      .status(400)
      .json({ success: false, error: true, message: "Invalid Id" });
  }

  const user = users[index];

  users[index] = {
    ...user,
    id,
    name,
    email,
  };

  res.json({
    success: true,
    message: "user updated Successfully",
    data: users[index],
  });
};
