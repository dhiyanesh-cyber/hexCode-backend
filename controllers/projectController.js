import Project from '../models/Project.js';
import User from '../models/User.js';
import Task from '../models/Task.js';


// Get team members for a project
export const getProjectTeamMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate('projectLead').exec();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }


    const members = await User.find({ _id: { $in: project.teamMembers } });

    res.json(members);

  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Failed to retrieve team members', error });
  }
};

// Create a task
export const createTask = async (req, res) => {
  const { id } = req.params;
  const { name, desc, deadline, priority, assignee, assigner } = req.body;

  try {
    const newTask = await Task.create({
      name,
      desc,
      deadline,
      priority,
      project: id,
      assignee,
      assigner
    });

    res.status(201).json(newTask);

  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
};

// Retrieve tasks for the project
export const getTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await Task.find({ project: id }).populate('assignee').exec();
    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks', error });
  }
};

// ✅ Create Project
export const createProject = async (req, res) => {
  const { name, description, projectLead, teamMembers } = req.body;

  try {
    const project = new Project({
      name,
      description,
      projectLead,
      teamMembers
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

// ✅ Get all projects by lead's userId
export const getProjectsByLead = async (req, res) => {
  const { userId } = req.params;

  try {
    const projects = await Project.find({ projectLead: userId }).populate('projectLead');

    if (!projects.length) {
      return res.status(200).json({ message: 'No projects found', projects: [] });
    }

    res.status(200).json({ projects });

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Get a single project
export const getProject = async (req, res) => {
  console.log("Received");

  const project = await Project.findById(req.params.id).populate('projectLead');
  res.json(project);
};

// ✅ Update a project
export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
};

// ✅ Delete a project
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
};
