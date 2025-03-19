import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  deadline: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assigner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
