import { Request, Response, RequestHandler, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/enviroment';

type EmptyObject = Record<string, never>; // i.e. {}

export const authMiddleware: RequestHandler<EmptyObject, any, any, EmptyObject> = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('failed to authenticate');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('failed to authenticate');
  }

  try {
    const payload: any = jwt.verify(token, config.auth.github_client_secret ?? '');
    req.userId = payload.userId;
    return next();
  } catch (err) {
    throw new Error('failed to authenticate');
  }
};
