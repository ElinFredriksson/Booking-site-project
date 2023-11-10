

import express from 'express';
import { signup, login, getUser } from '../models/userModel';
import authenticateToken from '../middleware/authMiddleware';

const userRoutes = express.Router();



userRoutes.post('/signup', signup);
userRoutes.post('/login', login);
userRoutes.get('/profile',authenticateToken, getUser);

export default userRoutes;
