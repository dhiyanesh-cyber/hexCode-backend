import express from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController.js';
import Task from '../models/Task.js';

const router = express.Router();

router.post('/', createTask);          // Create a new task
router.get('/', getTasks);             // Get all tasks
router.get('/:id', getTask);           // Get task by ID
router.put('/:id', updateTask);        // Update task
router.delete('/:id', deleteTask);     // Delete task

// ✅ New route: Get tasks by project ID
router.get('/project/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId }).populate('assignee assigner');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
});

export default router;
