import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Send back the user data (except the password) for local storage
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({
            message: 'Login successful',
            user: userData
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
