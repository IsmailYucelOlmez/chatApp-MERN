import { Request } from 'express';
import { IUser } from '../entities/user.entity.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
} 