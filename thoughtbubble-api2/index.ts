import 'reflect-metadata';
import cors from 'cors';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import { join } from 'path';
import express from 'express';
import projectRouter from './routes/projects'; // default export
import thoughtRouter from './routes/thoughts';
import emailRouter from './routes/email';
import { User } from './entities/User';

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

(async function () {
  try {
    await createConnection({
      type: 'postgres',
      database: 'thoughtbubble',
      entities: [join(__dirname, './entities/*.*')],
      logging: NODE_ENV === 'development',
      synchronize: NODE_ENV === 'development',
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
  app.use('/api/email', emailRouter);
  app.listen(PORT, () => console.log(`✅ listening on port ${PORT}`));
})();
