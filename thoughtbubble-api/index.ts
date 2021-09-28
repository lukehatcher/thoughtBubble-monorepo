import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { join } from 'path';
import redis from 'redis';
import { router as projectRouter } from './routes/projects';
import { router as thoughtRouter } from './routes/thoughts';
import { router as userInfoRouter } from './routes/userInfo';
import { router as activityRouter } from './routes/activity';
import { router as mobileClientAuthRouter } from './routes/mobileAuth';
import { router as vscodeClientAuthRouter } from './routes/vscodeAuth';
import { config } from './config/enviroment';
import { authMiddleware } from './middleware/authMiddleware';

export const redisClient = redis.createClient();

(async function () {
  try {
    await createConnection({
      type: 'postgres',
      database: 'thoughtbubble',
      entities: [join(__dirname, './entities/*.*')],
      logging: config.node_env === 'development',
      synchronize: config.node_env === 'development',
      // dropSchema: true,
    });
  } catch (err) {
    console.error('error creating typeORM postgres connection', err);
  }

  const app = express();

  app.use(cors({ origin: '*' }));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use('/auth/github/mobile', mobileClientAuthRouter); // need to update rn code accordingly
  app.use('/auth/github/vscode', vscodeClientAuthRouter);
  app.use('/projects', authMiddleware, projectRouter);
  app.use('/thoughts', authMiddleware, thoughtRouter);
  app.use('/userinfo', authMiddleware, userInfoRouter);
  app.use('/activity', authMiddleware, activityRouter);
  app.listen(config.port, () => console.log(`🚀 listening on port ${config.port}`));
})();
