import User from '../models/User.js';

export const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};


export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// ✅ Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id name');  // Only fetch `_id` and `name`
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: ' User deleted' });
};


