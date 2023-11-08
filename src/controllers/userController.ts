

import express from 'express';
import { signup, login, getUser } from '../models/userModel';

const userRoutes = express.Router();



userRoutes.post('/signup', signup);
userRoutes.post('/login', login);
userRoutes.get('/profile/:id', getUser);

export default userRoutes;
