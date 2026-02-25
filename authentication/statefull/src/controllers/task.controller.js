import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  }

  try {
    const task = await Task({ title, description, user: req.session.userId });
    await task.save();

    res.status(201).json({ success: true, message: "Task created successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong in create task ${error.message}`,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({ user: req.session.userId });

    if (!task) {
      return res.status(200).json({ success: true, message: "Task is empty" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong in get all task ${error.message}`,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  try {
    const task = await Task.findByIdAndDelete({
      _id: id,
      user: req.session.userId,
    });
    console.log(task);
    if (!task) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }

    res.status(200).json({ success: true, message: "Task deleted successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong in delete task ${error.message}`,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      {
        _id: id,
        user: req.session.userId,
      },
      { title, description },
      { returnDocument: "after" },
    );

    if (!task) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task updated successful", data: task });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong in update task ${error.message}`,
    });
  }
};
