import { Request, Response, RequestHandler, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/enviroment';

export const authMiddleware: RequestHandler<{}, any, any, {}> = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('failed to authenticate');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('failed to authenticate');
  }

  // ===== for vscode DEV only =====
  if (token === config.vscode_dev.vscode_dev_token) {
    req.userId = config.vscode_dev.vscode_dev_userid!;
    return next();
  }
  // ===============================

  try {
    const payload: any = jwt.verify(token, config.auth.github_client_secret!);
    req.userId = payload.userId;
    return next();
  } catch (err) {
    throw new Error('failed to authenticate');
  }
};
