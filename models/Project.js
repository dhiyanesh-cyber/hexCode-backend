import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  projectLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teamMembers: [{ type: String }]  // Store member keys as an array
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
