import 'reflect-metadata';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Thought } from '../entities/Thought';
import { User } from '../entities/User';
import { sendEmail } from '../services/email';

class emailController {
  private readonly location: string;

  constructor() {
    this.location = '@emailControllers.ts: ';
  }

  public toggleDailyEmailSetting = async (req: Request, res: Response): Promise<void> => {
    const { userSub } = req.body;
    try {
      const user = await User.findOne({ githubId: userSub });
      const dailyEmailSetting = user?.dailyEmail;
      await getConnection() //
        .createQueryBuilder()
        .update(User)
        .set({ dailyEmail: !dailyEmailSetting })
        .where('githubId = :githubId', { githubId: userSub })
        .execute();
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
        res.sendStatus(200);
      }
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new emailController();
