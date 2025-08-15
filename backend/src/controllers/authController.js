import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
const tokenFor = (u) => jwt.sign({ id: u._id, email: u.email, isAdmin: u.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
export const register = async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email }); if (exists) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  res.status(201).json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
};
export const login = async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = await User.findOne({ email }); if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password); if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
};