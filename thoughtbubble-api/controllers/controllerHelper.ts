import { getConnection } from 'typeorm';
import { promisify } from 'util';
import { Activity } from '../entities/Activity';
import { Project } from '../entities/Project';
import { Thought } from '../entities/Thought';
import { User } from '../entities/User';
import { redisClient } from '../index';

/**
 * this class provides methods that are used across more than one controller
 */
export class ControllerHelper {
  private readonly fname: string;

  protected constructor() {
    this.fname = '@controllerHelper.ts: ';
  }

  private async saveActivity(userId: string, projectId: string) {
    const activity = new Activity();
    activity.activityDate = new Date();
    activity.user = (await User.findOne({ id: userId }))!;
    activity.project = (await Project.findOne({ id: projectId }))!;
    getConnection().manager.save(activity);
  }

  /**
   * Activity is recorded on thought addition, completion, or project addition.
   * Activity for thought completion is only counted the first time if the thought is toggled.
   * @param userSub ex: `github|12345678`
   * @param projectId uuid
   */
  public async recordActivity(userId: string, projectId: string, thoughtId?: string): Promise<void> {
    try {
      if (thoughtId) {
        const thought = await Thought.findOne({ id: thoughtId });
        // if the thought has been completed before, don't record activity
        if (thought?.completedYet) return;
        // record activity
        else {
          this.saveActivity(userId, projectId);
          // mark thought's completeYet to true to prevent double recording
          if (!thought?.completedYet) {
            await getConnection()
              .createQueryBuilder()
              .update(Thought)
              .set({ completedYet: true })
              .where('id = :id', { id: thoughtId })
              .execute();
          }
        }
      } else {
        // record all project creation activity
        this.saveActivity(userId, projectId);
      }
    } catch (err) {
      console.error(this.fname, err);
    }
  }

  /**
   * on thought addition, deletion, edit, tag edit or project archive
   * @param projectId uuid
   */
  public async updateLastUpdatedDate(projectId: string) {
    await getConnection()
      .createQueryBuilder()
      .update(Project)
      .set({ lastUpdatedDate: new Date() })
      .where('id = :id', { id: projectId })
      .execute();
  }

  /**
   * sets Redis cache with (key, val) pair
   * default value expiration of 1hr
   */
  public cacheSet(key: string, value: string): void {
    const defaultExpiration = 3600;
    redisClient.setex(key, defaultExpiration, value);
  }

  /**
   * returns stored value if key exists in Redis cache
   */
  public async cacheGet(key: string): Promise<string | undefined> {
    const asyncGet = promisify(redisClient.get).bind(redisClient);
    const cachedValue = await asyncGet(key);
    if (cachedValue) {
      return cachedValue;
    }
    return undefined;
  }
}
