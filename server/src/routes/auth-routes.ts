import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv'
dotenv.config()
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await User.findOne(
    { where: { "username": username } }
  )
  if (!user) {
    console.log('No user found!')
    res.json({"message": "No user found"});
  } else {
    const validatePwd = await bcrypt.compare(password, user.password)
    if (!validatePwd) {
      return console.log('login failed!')
    }
    const secretKey = process.env.JWT_SECRET_KEY || ''
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    // localStorage.setItem('token', token)
    return (res.json({ token }))
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
