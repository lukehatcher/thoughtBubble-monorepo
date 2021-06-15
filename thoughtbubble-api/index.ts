import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';
import express, { Request, Response } from 'express';
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
          // if the user's github name/data updated, update it
          // await getConnection()
          //   .createQueryBuilder()
          //   .update(User)
          //   .set({ username: profile.displayName, email: profile.emails ? profile.emails[0].value : '' })
          //   .where('id = :id', { id: profile.id })
          //   .execute();
        } else {
          // first time user, create new user
          user = await User.create({
            githubId: profile.id,
            username: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
          }); // .save();
        }
        // should be an env variable
        cb(null, { accessToken: jwt.sign({ userId: user.id }, 'asdfasdfasdf', { expiresIn: '1y' }) });
      }
    )
  );

  app.get('/auth/github', passport.authenticate('github', { session: false }));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github'), // { failureRedirect: '/login' }
    function (req: any, res: Response) {
      // Successful authentication, redirect home.
      res.send(req.user.accessToken);
      res.redirect(''); // normally redirect back to website
    }
  );

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json()); // for post and x only
  // app.put('/login', loginController);
  app.use('/projects', projectRouter);
  app.use('/thoughts', thoughtRouter);
  app.use('/userinfo', userInfoRouter);
  app.use('/activity', activityRouter);
  app.listen(config.port, () => console.log(`🚀 listening on port ${config.port}`));
})();
