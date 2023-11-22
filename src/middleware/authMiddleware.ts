import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the request header
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).send('Access denied. No token provided.');

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');
        console.log('User info:', user);
        // Attach the user info to the request for further use
        (req as any).user = user;
        // console.log('User info in request:', (req as any).user);
        next();
    });
};

export default authenticateToken;
