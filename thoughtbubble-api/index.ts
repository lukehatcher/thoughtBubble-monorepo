import 'reflect-metadata';
import cors from 'cors';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import { join } from 'path';
import express from 'express';
import projectRouter from './routes/projects';
import thoughtRouter from './routes/thoughts';
import userInfoRouter from './routes/userInfo';
import config from './config/enviroment';

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
  app.listen(config.port, () => console.log(`✅ listening on port ${config.port}`));
})();
