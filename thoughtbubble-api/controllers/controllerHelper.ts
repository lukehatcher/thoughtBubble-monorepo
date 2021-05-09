import { getConnection } from 'typeorm';
import { Activity } from '../entities/Activity';
import { Project } from '../entities/Project';
import { Thought } from '../entities/Thought';
import { User } from '../entities/User';

/**
 * this class provides methods that are used across more than one controller
 */
export class ControllerHelper {
  private readonly fname: string;

  constructor() {
    this.fname = '@controllerHelper.ts: ';
  }

  private saveActivity = async function (userSub: string, projectId: string) {
    const activity = new Activity();
    activity.activityDate = new Date();
    activity.user = (await User.findOne({ githubId: userSub }))!;
    activity.project = (await Project.findOne({ id: projectId }))!;
    getConnection().manager.save(activity);
  };

  /**
   * Activity is recorded on thought addition, completion, or project addition.
   * Activity for thought completion is only counted the first time if the thought is toggled.
   * @param userSub ex: `github|12345678`
   * @param projectId uuid
   */
  public recordActivity = async (userSub: string, projectId: string, thoughtId?: string): Promise<void> => {
    try {
      if (thoughtId) {
        const thought = await Thought.findOne({ id: thoughtId });
        // if the thought has been completed before, don't record activity
        if (thought?.completedYet) return;
        // record activity
        else {
          this.saveActivity(userSub, projectId);
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
        this.saveActivity(userSub, projectId);
      }
    } catch (err) {
      console.error(this.fname, err);
    }
  };
}
