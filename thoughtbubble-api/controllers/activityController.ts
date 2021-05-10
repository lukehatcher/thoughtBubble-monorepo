import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Thought } from '../entities/Thought';
import { User } from '../entities/User';

class ActivityController {
  private readonly location: string;

  constructor() {
    this.location = '@activityControllers.ts: ';
  }

  public fetchUserActivity = async (req: Request, res: Response): Promise<void> => {
    const { userSub } = req.body;
    try {
      const user = await User.findOne({ githubId: userSub });
      const userIdx = user?.id;
      const userActivity = await getRepository(Thought)
        .createQueryBuilder('activity')
        .where('activity.userId = :userId', { userId: userIdx })
        .orderBy('activity.createdDate', 'ASC')
        .getMany();

      res.send(userActivity);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new ActivityController();
