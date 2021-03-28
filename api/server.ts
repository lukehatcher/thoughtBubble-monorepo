import * as express from 'express';
import * as morgan from 'morgan';
import projectRoutes from './routes/projects';
import thoughtRoutes from './routes/thoughts';

const PORT = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

// serve routes as middleware
app.use('/api/projects', projectRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(PORT, () => console.log(`✅ listening on port ${PORT}`));
