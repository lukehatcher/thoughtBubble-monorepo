import * as oauth2 from 'passport-oauth2';
import { Strategy as GitHubStrategy } from 'passport-github';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
import { config } from '../config/enviroment';
import { User } from '../entities/User';

export const githubVerifyCallback = async (
  _: string, // accessToken
  __: string, // refreshToken
  profile: GitHubStrategy.Profile,
  cb: oauth2.VerifyCallback
) => {
  // console.log(profile);
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
};
