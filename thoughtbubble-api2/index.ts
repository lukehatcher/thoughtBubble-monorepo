import { createConnection } from 'typeorm';
import { join } from 'path';
import express from 'express';
import projectRouter from './routes/projects'; // default export

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'thoughtbubble',
    entities: [join(__dirname, './entities/*.*')],
    logging: true, // !process.env.__prod__
    synchronize: true,
  });

  // const newUser = await User.create({ username: 'bobhatcher', githubId: '1337', email: 'swag@bob.com' }).save();
  // console.log(newUser);

  const app = express();
  // app.use(cors({origin: '*'}));
  app.use(express.json()); // for post and x only
  app.get('/', (_req, res) => {
    res.send('hello');
  });

  app.use('/api/projects', projectRouter);
  // app.use('/api/thoughts', thoughtRoutes);

  app.listen(3001, () => {
    console.log('📈listening on port 3001');
  });
};

main();
