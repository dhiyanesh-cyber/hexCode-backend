import express from 'express';
import {
    createProject,
    getProjectsByLead,
    getProject,
    updateProject,
    deleteProject,
    getProjectTeamMembers,
    createTask,
    getTasks
} from '../controllers/projectController.js';

const router = express.Router();

// ✅ CRUD routes
router.post('/', createProject);
router.get('/lead/:userId', getProjectsByLead);   // ✅ Fetch projects by userId
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

router.get('/:id/members', getProjectTeamMembers);  // Get team members of a project
router.post('/:id/tasks', createTask);              // Create task for a project
router.get('/:id/tasks', getTasks);

export default router;
