/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../modules/user/user.model';
import { envVars } from '../config/env';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, envVars.JWT_SECRET);
    const user = await User.findById((decoded as any).id);
    if (!user || user.isActive !== 'ACTIVE') return res.status(401).json({ error: 'Invalid or inactive user' });

    req.user = user;
    console.log('Authenticated user:', user);  // Added for debugging
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    console.log('User role:', req.user.role);  // Added for debugging
    next();
  };
};
