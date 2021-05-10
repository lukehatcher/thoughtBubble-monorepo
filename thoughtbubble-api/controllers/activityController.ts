import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Activity } from '../entities/Activity';
import { User } from '../entities/User';

class ActivityController {
  private readonly location: string;

  constructor() {
    this.location = '@activityControllers.ts: ';
  }

  public fetchUserActivity = async (req: Request, res: Response): Promise<void> => {
    const userSub = req.query.userSub as string;
    try {
      const user = await User.findOne({ githubId: userSub });
      const userIdx = user?.id;
      const userActivity = await getRepository(Activity)
        .createQueryBuilder('activity')
        .where('activity.user = :user', { user: userIdx })
        .getMany();

      res.send(JSON.stringify(userActivity));
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new ActivityController();
