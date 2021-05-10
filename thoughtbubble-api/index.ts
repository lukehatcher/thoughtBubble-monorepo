import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { join } from 'path';
import { router as projectRouter } from './routes/projects';
import { router as thoughtRouter } from './routes/thoughts';
import { router as userInfoRouter } from './routes/userInfo';
import { router as activityRouter } from './routes/activity';
import { config } from './config/enviroment';

(async function () {
  try {
    await createConnection({
      type: 'postgres',
      database: 'thoughtbubble',
      entities: [join(__dirname, './entities/*.*')],
      logging: config.node_env === 'development',
      synchronize: config.node_env === 'development',
    });
  } catch (err) {
    console.error('error creating typeORM postgres connection', err);
  }

  const app = express();
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json()); // for post and x only
  app.use('/api/projects', projectRouter);
  app.use('/api/thoughts', thoughtRouter);
  app.use('/api/userinfo', userInfoRouter);
  app.use('/api/activity', activityRouter);
  app.listen(config.port, () => console.log(`✅ listening on port ${config.port}`));
})();
