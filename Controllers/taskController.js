const db = require("../models");

const addTask = async (req, res) => {
  const { title, priority, dueDate } = req.body;
  const userId = req.user.userId;
  try {
    const task = await db.Task.create({ title, priority, dueDate, userId });
    if (!dueDate) {
      return res.status(400).json({ message: "Due date is required" });
    }
    if (!priority) {
      task.priority = "mid";
    }
    await task.save();
    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Task creation error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await db.Task.findAll();
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const { title, priority, dueDate } = req.body;

  try {
    const task = await db.Task.findOne({ where: { id, userId } });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or does not belong to you" });
    }

    task.title = title;
    task.priority = priority;
    task.dueDate = dueDate;

    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Task update error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  try {
    const task = await db.Task.findOne({ where: { id, userId } });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or does not belong to you" });
    }
    await task.destroy();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Task deletion error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};
