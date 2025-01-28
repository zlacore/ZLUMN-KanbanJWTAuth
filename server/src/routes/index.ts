import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes (Not sure if this is done yet, still getting errors)
router.use('/api', apiRoutes), authenticateToken;

export default router;
