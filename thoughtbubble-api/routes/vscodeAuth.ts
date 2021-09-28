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
  'github:vscode', // my custom strategy name -> defaults to 'github' with github passport.js
  new GitHubStrategy(
    {
      clientID: config.auth.github_client_id_vscode!,
      clientSecret: config.auth.github_client_secret_vscode!,
      callbackURL: config.auth.github_callback_url_vscode,
    },
    githubVerifyCallback
  )
);

router.route('/').get(passport.authenticate('github:vscode', { session: false }));

router.route('/callback').get(passport.authenticate('github:vscode', { session: false }), (req: any, res: Response) => {
  // vscode auth process redirects to server running in vscode on port 6666, that server listens and saves the access token
  res.redirect(`http://localhost:7777/auth/${req.user.accessToken}`);
});
