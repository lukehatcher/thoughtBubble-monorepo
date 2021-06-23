import express, { Response } from 'express';
import passport from 'passport';

export const router = express.Router();

router.route('/github').get(passport.authenticate('github', { session: false }));

router.route('/github/callback').get(passport.authenticate('github'), (req: any, res: Response) => {
  res.redirect(`thoughtbubble://${req.user.accessToken}`); // deep-link
});
