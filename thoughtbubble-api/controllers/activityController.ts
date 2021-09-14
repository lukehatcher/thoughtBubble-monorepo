import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Activity } from '../entities/Activity';
import { ControllerHelper } from './controllerHelper';

class ActivityController extends ControllerHelper {
  private readonly location: string;

  constructor() {
    super();
    this.location = '@activityControllers.ts: ';
  }

  public fetchUserActivity = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req;

    // check redis cache
    const cacheKey = `activity:${userId}`;
    const cacheResponse = await this.cacheGet(cacheKey);
    if (cacheResponse) {
      res.send(JSON.parse(cacheResponse));
      return;
    }

    try {
      const userActivity = await getRepository(Activity)
        .createQueryBuilder('activity')
        .where('activity.user = :user', { user: userId })
        .getMany();
      // set redis cache
      this.cacheSet(cacheKey, JSON.stringify(userActivity));
      // return data to client
      res.send(userActivity);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new ActivityController();
