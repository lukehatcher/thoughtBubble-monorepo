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
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';

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
      (_, __, profile, cb) => {
        console.log(profile);
        cb(null, { accessToken: 'asdf', refreshToken: '' });
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    )
  );

  app.get('/auth/github', passport.authenticate('github', { session: false }));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github'), // { failureRedirect: '/login' }
    function (_req, res) {
      // Successful authentication, redirect home.
      // res.redirect('/');
      res.send('logged in correctly');
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
