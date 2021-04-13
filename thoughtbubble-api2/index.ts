import 'reflect-metadata';
import cors from 'cors';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import { join } from 'path';
import express from 'express';
import projectRouter from './routes/projects'; // default export
import thoughtRouter from './routes/thoughts';
import { User } from './entities/User';

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'thoughtbubble',
    entities: [join(__dirname, './entities/*.*')],
    logging: true, // !process.env.__prod__
    synchronize: true,
  });

  const app = express();
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json()); // for post and x only
  app.use('/api/projects', projectRouter);
  app.use('/api/thoughts', thoughtRouter);
  app.listen(3001, () => console.log('📈listening on port 3001'));
};

main();
