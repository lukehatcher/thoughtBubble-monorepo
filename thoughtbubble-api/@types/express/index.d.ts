import * as express from 'express';

/**
 * extends Request type with userId property which gets added in my auth middleware
 */
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
