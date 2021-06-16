import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { join } from 'path';
import { router as projectRouter } from './routes/projects';
import { router as thoughtRouter } from './routes/thoughts';
import { router as userInfoRouter } from './routes/userInfo';
import { router as activityRouter } from './routes/activity';
import { config } from './config/enviroment';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { User } from './entities/User';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middleware/authMiddleware';

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
        callbackURL: 'http://localhost:3001/auth/github/callback', // needs to match what we gave github
      },
      async (_, __, profile, cb) => {
        console.log(profile);
        // check if user exists before saving
        let user = await User.findOne({ where: { githubId: profile.id } });
        if (user) {
          // if the user's github name/data exist already, update it uncase they changed it on github.com
          await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
              username: profile.username,
              displayName: profile.displayName,
              email: profile.emails ? profile.emails[0].value : '',
              avatarUrl: (profile._json as any).avatar_url,
            })
            .where('id = :id', { id: user.id })
            .execute();
        } else {
          // first time user, create new User
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
            avatarUrl: (profile._json as any).avatar_url,
          }).save();
        }
        cb(null, {
          accessToken: jwt.sign({ userId: user.id }, config.auth.github_client_secret!, { expiresIn: '1y' }),
        });
      }
    )
  );

  app.get('/auth/github', passport.authenticate('github', { session: false }));

  app.get('/auth/github/callback', passport.authenticate('github'), function (req: any, res: Response) {
    res.redirect(`thoughtbubble://${req.user.accessToken}`); // deep-link
  });

  app.get('/user', async (req: Request, res: Response) => {
    // Authorization: <type> <credentials>
    const authHeader = req.headers.authorization;
    console.log('authheader', authHeader);
    if (!authHeader) {
      res.send({ user: null });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.send({ user: null });
      return;
    }

    let userId = '';
    try {
      const payload: any = jwt.verify(token, config.auth.github_client_secret!);
      userId = payload.userId;
      console.log('payload', payload);
      console.log('userid', userId);
    } catch (err) {
      res.send({ user: null });
      console.error(err);
    }

    if (!userId) {
      res.send({ user: null });
      return;
    }

    const user = await User.findOne({ id: userId });
    res.send(user);
  });

  // app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use('/projects', authMiddleware, projectRouter);
  app.use('/thoughts', authMiddleware, thoughtRouter);
  app.use('/userinfo', authMiddleware, userInfoRouter);
  app.use('/activity', authMiddleware, activityRouter);
  app.listen(config.port, () => console.log(`🚀 listening on port ${config.port}`));
})();
