import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import { generateToken } from '../utils/generateToken.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required.');
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid email or password.');
  }
  const token = generateToken(user._id);
  res.json({
    success: true,
    data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
    message: 'Login successful.',
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select('-passwordHash');
  if (!user) throw new ApiError(404, 'User not found.');
  res.json({ success: true, data: user, message: 'User profile.' });
});
