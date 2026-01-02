import { readFile, writeFile } from "../utils/file-operations.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const tasks = await readFile();

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "fields are missing" });
  }

  const newTask = {
    id: crypto.randomUUID(),
    title,
    description,
    userEmail: req.session.user,
    isCompleted: false,
  };

  tasks.push(newTask);
  writeFile(tasks);
  res.status(201).json({ success: true, data: newTask });
};

export const getAllTasks = async (req, res) => {
  const allTasks = await readFile();
  const task = allTasks.filter((task) => task.userEmail === req.session.user);
  res.json({ success: true, data: task });
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const allTasks = await readFile();
  const tasks = allTasks.filter((task) => task.userEmail === req.session.user);

  if (!tasks) {
    return res.status(200).json({ success: true, message: "task is empty" });
  }

  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  res.json({ success: true, data: tasks[index] });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const allTasks = await readFile();
  const tasks = allTasks?.filter((task) => task.userEmail === req.session.user);

  if (!tasks) {
    return res.status(200).json({ success: true, message: "task is empty" });
  }

  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  tasks.splice(index, 1);

  const tasksUpdated = allTasks.filter((task) => task.id !== id);
  writeFile(tasksUpdated);
  res.json({ success: true, message: "task deleted successfully" });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const allTasks = await readFile();

  if (!title || !description || !isCompleted) {
    return res
      .status(400)
      .json({ success: false, message: "fields are missing" });
  }

  const tasks = allTasks?.filter((task) => task.userEmail === req.session.user);

  if (!tasks) {
    return res.status(200).json({ success: true, message: "task is empty" });
  }

  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  tasks[index] = {
    ...tasks[index],
    title,
    description,
    isCompleted,
  };

  const tasksUpdated = allTasks.map((task) => {
    if (task.id === id) {
      return { ...task, title, description, isCompleted };
    } else {
      return task;
    }
  });

  writeFile(tasksUpdated);
  res.json({
    success: true,
    message: "task updated successfully",
    data: tasks[index],
  });
};
