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

  // private markThoughtAsCompletedYet = async function(thoughtId: string) {
  // 	await getConnection()
  // 	.createQueryBuilder()
  // 	.update(Thought)
  // 	.set({ completedYet: true })
  // 	.where('id = :id', { id: thoughtId })
  // 	.execute();
  // }

  // private saveActivity = async()

  /**
   * on thought addition, completion, or project addition
   * (coming soon) should only register on first time a thought is completed to avoid abuse
   * @param userSub ex: `github|12345678`
   * @param projectId uuid
   */
  public recordActivity = async (userSub: string, projectId: string, thoughtId?: string): Promise<void> => {
    try {
      if (thoughtId) {
        // if the thought has had it's status changes to completed before, don't count its second status change to completed
        const thought = await Thought.findOne({ id: thoughtId });
        if (thought?.completedYet) return;
        else {
          // record activity
          const activity = new Activity();
          activity.activityDate = new Date();
          activity.user = (await User.findOne({ githubId: userSub }))!;
          activity.project = (await Project.findOne({ id: projectId }))!;
          getConnection().manager.save(activity);

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
        const activity = new Activity();
        activity.activityDate = new Date();
        activity.user = (await User.findOne({ githubId: userSub }))!;
        activity.project = (await Project.findOne({ id: projectId }))!;
        getConnection().manager.save(activity);
      }
    } catch (err) {
      console.error(this.fname, err);
    }
  };
}
