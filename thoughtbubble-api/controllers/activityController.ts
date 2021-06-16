import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Activity } from '../entities/Activity';

class ActivityController {
  private readonly location: string;

  constructor() {
    this.location = '@activityControllers.ts: ';
  }

  public fetchUserActivity = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req;
    try {
      const userActivity = await getRepository(Activity)
        .createQueryBuilder('activity')
        .where('activity.user = :user', { user: userId })
        .getMany();
      res.send(userActivity);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new ActivityController();
