import 'reflect-metadata';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';
import { sendEmail } from '../services/email';

class userInfoController {
  private readonly location: string;

  constructor() {
    this.location = '@emailControllers.ts: ';
  }

  public toggleDailyEmailSetting = async (req: Request, res: Response): Promise<void> => {
    const { userSub } = req.body;
    try {
      const user = await User.findOne({ githubId: userSub });
      const dailyEmailSetting = user?.dailyEmail;
      if (dailyEmailSetting) {
        // opting out
        sendEmail(
          user!.email,
          'thoughtBubble email settings changed',
          '<h1>thoughtBubble</h1><p>you have successfully turned <b>off</b> email notifications</p>'
        );
        res.sendStatus(200);
      } else {
        // opting in
        sendEmail(
          user!.email,
          'thoughtBubble email settings changed',
          '<h3>thoughtBubble</h3><p>you have successfully turned <b>on</b> email notifications</p>'
        );
        await getConnection() //
          .createQueryBuilder()
          .update(User)
          .set({ dailyEmail: !dailyEmailSetting })
          .where('githubId = :githubId', { githubId: userSub })
          .execute();
        res.sendStatus(200);
      }
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public fetchUserInfo = async (req: Request, res: Response): Promise<void> => {
    const userSub = req.query.userSub as string;
    try {
      const user = await User.findOne({ githubId: userSub });
      // return user item without projects
      // cannot just delete cause of ts 2790
      const userInfo = {
        id: user?.id,
        username: user?.username,
        githubId: user?.githubId,
        email: user?.email,
        dailyEmail: user?.dailyEmail,
      };
      res.send(userInfo);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new userInfoController();
