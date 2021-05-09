import { getConnection } from 'typeorm';
import { Activity } from '../entities/Activity';
import { Project } from '../entities/Project';
import { User } from '../entities/User';

/**
 * this class provides methods that are used across more than one controller
 */
export class ControllerHelper {
  /**
   * on thought addition, completion, or project addition
   * (coming soon) should only register on first time a thought is completed to avoid abuse
   * @param userSub ex: `github|12345678`
   * @param projectId
   */
  public recordActivity = async function (userSub: string, projectId: string): Promise<void> {
    const activity = new Activity();
    activity.activityDate = new Date();
    activity.user = (await User.findOne({ githubId: userSub }))!;
    activity.project = (await Project.findOne({ id: projectId }))!;
    getConnection().manager.save(activity);
  };
}
