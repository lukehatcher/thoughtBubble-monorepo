import 'reflect-metadata';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';
import { sendEmail } from '../services/email';
import jwt from 'jsonwebtoken';
import { config } from '../config/enviroment';

class userInfoController {
  private readonly location: string;

  constructor() {
    this.location = '@userInfoControllers.ts: ';
  }

  // public fetchUserInfo = async (req: Request, res: Response): Promise<void> => {
  //   const {userId} = req;
  //   try {
  //     const user = await User.findOne({ id: userId });
  //     // return user obj without projects arr, cannot just delete projs arr cause of ts2790
  //     const userInfo = {
  //       id: user?.id,
  //       username: user?.username,
  //       githubId: user?.githubId,
  //       email: user?.email,
  //       dailyEmail: user?.dailyEmail,
  //       weeklyEmail: user?.weeklyEmail,
  //       darkMode: user?.darkMode,
  //       projectOrder: user?.projectOrder,
  //       projectDirection: user?.projectDirection,
  //       saveOrder: user?.saveOrder,
  //     };
  //     res.send(userInfo);
  //   } catch (err) {
  //     console.error(this.location, err);
  //     res.sendStatus(400);
  //   }
  // };

  /**
   * fetch user or set new user
   */
  public fetchOrSetUser = async (req: Request, res: Response) => {
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
  };

  public toggleDarkMode = async (req: Request, res: Response) => {
    const { userId } = req;
    try {
      const user = await User.findOne({ id: userId });
      const darkModeSetting = user?.darkMode;
      await getConnection() //
        .createQueryBuilder()
        .update(User)
        .set({ darkMode: !darkModeSetting })
        .where('id = :id', { id: userId })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public toggleDailyEmailSetting = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req;
    const user = await User.findOne({ id: userId });
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
      .where('id = :id', { id: userId })
      .execute();
    res.sendStatus(200);
  };

  public toggleWeeklyEmailSetting = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req;
    const user = await User.findOne({ id: userId });
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
      .where('id = :id', { id: userId })
      .execute();
    res.sendStatus(200);
  };

  public updateProjectOrder = async (req: Request, res: Response) => {
    const { projectOrder } = req.body;
    const { userId } = req;
    const user = await User.findOne({ id: userId });
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ projectOrder: projectOrder })
        .where('id = :id', { id: userId })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public updateProjectDirection = async (req: Request, res: Response) => {
    const { projectDirection } = req.body;
    const { userId } = req;
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ projectDirection: projectDirection })
        .where('id = :id', { id: userId })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public toggleProjectOrderSetting = async (req: Request, res: Response) => {
    const { projectOrder, projectDirection } = req.body;
    const { userId } = req;
    console.log(projectOrder, projectDirection);
    const user = await User.findOne({ id: userId });
    const currSetting = user?.saveOrder;
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ saveOrder: !currSetting, projectOrder, projectDirection })
        .where('id = :id', { id: userId })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new userInfoController();
