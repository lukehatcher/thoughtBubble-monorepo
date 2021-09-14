import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { join } from 'path';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import redis from 'redis';
import { router as projectRouter } from './routes/projects';
import { router as thoughtRouter } from './routes/thoughts';
import { router as userInfoRouter } from './routes/userInfo';
import { router as activityRouter } from './routes/activity';
import { router as authRouter } from './routes/auth';
import { config } from './config/enviroment';
import { authMiddleware } from './middleware/authMiddleware';
import { githubVerifyCallback } from './auth/github';

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

  passport.serializeUser((user: any, done) => {
    done(null, user.accessToken); // docs say id
  });

  app.use(passport.initialize());

  passport.use(
    new GitHubStrategy(
      {
        clientID: config.auth.github_client_id!,
        clientSecret: config.auth.github_client_secret!,
        callbackURL: config.auth.github_callback_url,
      },
      githubVerifyCallback
    )
  );

  app.use(morgan('dev'));
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use('/projects', authMiddleware, projectRouter);
  app.use('/thoughts', authMiddleware, thoughtRouter);
  app.use('/userinfo', authMiddleware, userInfoRouter);
  app.use('/activity', authMiddleware, activityRouter);
  app.listen(config.port, () => console.log(`🚀 listening on port ${config.port}`));
})();
