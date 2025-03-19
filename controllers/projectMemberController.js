import ProjectMember from '../models/ProjectMember.js';

export const createProjectMember = async (req, res) => {
    const member = await ProjectMember.create(req.body);
    res.json(member);
};

export const getProjectMembers = async (req, res) => {
    const members = await ProjectMember.find().populate('project employee');
    res.json(members);
};

export const deleteProjectMember = async (req, res) => {
    await ProjectMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project member removed' });
};
