const TaskModel = require("../models/task.model");

const addTask = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    // Validate category (optional, if you want to enforce specific categories)
    const validCategories = ["Work", "Personal", "Shopping", "Other"];
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({ msg: "Invalid category" });
    }

    const task = new TaskModel({ title, description, category, user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const getTasks = async (req, res) => {
  const { category } = req.query; // Changed from `category_id` to `category`
  try {
    const tasks = await TaskModel.find({ user: req.userId, ...(category && { category }) });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await TaskModel.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { addTask, getTasks, getTaskById, updateTask, deleteTask };