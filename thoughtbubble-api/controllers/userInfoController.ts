import 'reflect-metadata';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';
import { sendEmail } from '../services/email';

class userInfoController {
  private readonly location: string;

  constructor() {
    this.location = '@userInfoControllers.ts: ';
  }

  public fetchUserInfo = async (req: Request, res: Response): Promise<void> => {
    const userSub = req.query.userSub as string;
    try {
      const user = await User.findOne({ githubId: userSub });
      // return user obj without projects arr, cannot just delete projs arr cause of ts2790
      const userInfo = {
        id: user?.id,
        username: user?.username,
        githubId: user?.githubId,
        email: user?.email,
        dailyEmail: user?.dailyEmail,
        weeklyEmail: user?.weeklyEmail,
        darkMode: user?.darkMode,
        projectOrder: user?.projectOrder,
        projectDirection: user?.projectDirection,
        saveOrder: user?.saveOrder,
      };
      res.send(userInfo);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public toggleDarkMode = async (req: Request, res: Response) => {
    const { userSub } = req.body;
    try {
      const user = await User.findOne({ githubId: userSub });
      const darkModeSetting = user?.darkMode;
      await getConnection() //
        .createQueryBuilder()
        .update(User)
        .set({ darkMode: !darkModeSetting })
        .where('githubId = :githubId', { githubId: userSub })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public toggleDailyEmailSetting = async (req: Request, res: Response): Promise<void> => {
    const { userSub } = req.body;
    const user = await User.findOne({ githubId: userSub });
    const dailyEmailSetting = user?.dailyEmail;
    if (dailyEmailSetting) {
      // opting out
      try {
        sendEmail(
          user!.email,
          'thoughtBubble email settings changed',
          '<h1>thoughtBubble</h1><p>you have successfully turned <b>off</b> daily email notifications</p>'
        );
      } catch (err) {
        console.error(this.location, err);
        res.sendStatus(400);
      }
    } else {
      // opting in
      try {
        sendEmail(
          user!.email,
          'thoughtBubble email settings changed',
          '<h3>thoughtBubble</h3><p>you have successfully turned <b>on</b> daily email notifications</p>'
        );
      } catch (err) {
        console.error(this.location, err);
        res.sendStatus(400);
      }
    }
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ dailyEmail: !dailyEmailSetting })
      .where('githubId = :githubId', { githubId: userSub })
      .execute();
    res.sendStatus(200);
  };

  public toggleWeeklyEmailSetting = async (req: Request, res: Response): Promise<void> => {
    const { userSub } = req.body;
    const user = await User.findOne({ githubId: userSub });
    const weeklyEmailSetting = user?.weeklyEmail;
    if (weeklyEmailSetting) {
      // opting out
      try {
        sendEmail(
          user!.email,
          'thoughtBubble email settings changed',
          '<h1>thoughtBubble</h1><p>you have successfully turned <b>off</b> weekly email notifications</p>'
        );
      } catch (err) {
        console.error(this.location, err);
        res.sendStatus(400);
      }
    } else {
      // opting in
      try {
        sendEmail(
          user!.email,
          'thoughtBubble email settings changed',
          '<h3>thoughtBubble</h3><p>you have successfully turned <b>on</b> weekly email notifications</p>'
        );
      } catch (err) {
        console.error(this.location, err);
        res.sendStatus(400);
      }
    }
    await getConnection() //
      .createQueryBuilder()
      .update(User)
      .set({ weeklyEmail: !weeklyEmailSetting })
      .where('githubId = :githubId', { githubId: userSub })
      .execute();
    res.sendStatus(200);
  };

  public updateProjectOrder = async (req: Request, res: Response) => {
    const { userSub, projectOrder } = req.body;
    const user = await User.findOne({ githubId: userSub });
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ projectOrder: projectOrder })
        .where('githubId = :githubId', { githubId: userSub })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public updateProjectDirection = async (req: Request, res: Response) => {
    const { userSub, projectDirection } = req.body;
    const user = await User.findOne({ githubId: userSub });
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ projectDirection: projectDirection })
        .where('githubId = :githubId', { githubId: userSub })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public toggleProjectOrderSetting = async (req: Request, res: Response) => {
    const { userSub, projectOrder, projectDirection } = req.body;
    console.log(projectOrder, projectDirection);
    const user = await User.findOne({ githubId: userSub });
    const currSetting = user?.saveOrder;
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ saveOrder: !currSetting, projectOrder, projectDirection })
        .where('githubId = :githubId', { githubId: userSub })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new userInfoController();
