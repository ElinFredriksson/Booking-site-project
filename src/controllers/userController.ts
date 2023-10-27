

import express from 'express';
import { signup, login } from '../models/userModel';

const userRoutes = express.Router();



userRoutes.post('/signup', signup);
userRoutes.post('/login', login);

export default userRoutes;
