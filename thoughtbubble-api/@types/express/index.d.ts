// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'; // Server breaks without import.

/**
 * extends Request type with userId property which gets added in my auth middleware.
 */
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
