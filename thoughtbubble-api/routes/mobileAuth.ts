import express, { Response } from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { githubVerifyCallback } from '../auth/github';
import { config } from '../config/enviroment';

export const router = express.Router();

passport.serializeUser((user: any, done) => {
  done(null, user.accessToken); // docs recommend id
});

router.use(passport.initialize());

passport.use(
  'github:mobile', // my custom strategy name -> defaults to 'github' with the github passport.js
  new GitHubStrategy(
    {
      clientID: config.auth.github_client_id!,
      clientSecret: config.auth.github_client_secret!,
      callbackURL: config.auth.github_callback_url,
    },
    githubVerifyCallback
  )
);

router.route('/').get(passport.authenticate('github:mobile', { session: false }));

router.route('/callback').get(passport.authenticate('github:mobile', { session: false }), (req: any, res: Response) => {
  res.redirect(`thoughtbubble://${req.user.accessToken}`); // deep-link
});
