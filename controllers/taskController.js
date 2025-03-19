import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find().populate('assignee assigner project');
  res.json(tasks);
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate('assignee assigner project');
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};
