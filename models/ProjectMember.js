import mongoose from 'mongoose';

const projectMemberSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const ProjectMember = mongoose.model('ProjectMember', projectMemberSchema);
export default ProjectMember;
