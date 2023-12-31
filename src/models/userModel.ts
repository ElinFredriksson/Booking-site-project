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
        
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

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
    console.log('Received login request');
    try {
        const { email, password } = req.body;
        // Check if email and password exist
        if (!email || !password) {
            return next(new Error('Please provide email and password') as any);
        }
        // Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new Error('Incorrect email or password') as any);
        }
        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET as string , {
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
        // If the error is already an instance of Error, you can rethrow it
        if (err instanceof Error) {
          return next(err);
        }
        // Otherwise, handle unexpected errors here
        console.error('Unexpected error during login:', err);
        next(new Error('Unexpected error during login') as any);
      }
    };

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = (req as any).user.userId
    try {
        const user = await User.findById(userId);
        res.status(200).json({
          status: 'success',
          data: {
            user,
          },
        });
      } catch (err) {
        next(err);
      }
};


