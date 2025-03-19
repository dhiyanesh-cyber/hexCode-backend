import express from 'express';
import { createProjectMember, getProjectMembers, deleteProjectMember } from '../controllers/projectMemberController.js';

const router = express.Router();

router.post('/', createProjectMember);
router.get('/', getProjectMembers);
router.delete('/:id', deleteProjectMember);

export default router;
