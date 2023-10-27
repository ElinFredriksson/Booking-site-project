// const User = require('../schemas/userSchema');
import User from '../schemas/userSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {} from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        // Check if email and password exist
        if (!email || !password) {
            return next(new Error('Please provide email and password'));
        }
        // Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new Error('Incorrect email or password'));
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string , {
            expiresIn: '1h',
        });
        res.status(200).json({
            status: 'success',
            data: {
                user,
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};
