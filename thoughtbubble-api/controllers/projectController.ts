import 'reflect-metadata';
import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Project } from '../entities/Project';
import { Thought } from '../entities/Thought';
import { User } from '../entities/User';
import { ControllerHelper } from './controllerHelper';

class ProjectsController extends ControllerHelper {
  private readonly location: string;

  constructor() {
    super();
    this.location = '@projectControllers.ts: ';
  }

  public fetchProjects = async (req: Request, res: Response): Promise<void> => {
    const userSub = req.query.userSub as string;
    try {
      const user = await User.findOne({ githubId: userSub }); // wack naming
      const userIdx = user?.id;
      const usersProjects = await getRepository(Project) //
        .createQueryBuilder('project')
        .where('project.userId = :userId', { userId: userIdx })
        .orderBy('project.lastUpdatedDate', 'DESC')
        .getMany();

      let data: any[] = usersProjects as any[];
      for (let i = 0; i < data.length; i++) {
        const projectIdx = data[i].id;
        const projectThoughts = await getRepository(Thought) //
          .createQueryBuilder('thought')
          .where('thought.projectId = :projectId', { projectId: projectIdx })
          .orderBy('thought.createdDate', 'ASC')
          .getMany();
        const projectThoughts2 = projectThoughts as any[];
        data[i].projectThoughts = projectThoughts2; // thoughts is a keyword
      }
      res.send(data).status(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public createProject = async (req: Request, res: Response): Promise<void> => {
    const { userSub, projectName, creationLocation } = req.body;
    try {
      const user = await User.findOne({ githubId: userSub }); // wack naming
      const userId = user?.id;
      const newProject = await Project.create({ projectName, userId, creationLocation }).save();
      await this.recordActivity(userSub, newProject.id);
      res.send(newProject); // maybe just send the id
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<void> => {
    const { userSub, projectId } = req.query;
    try {
      // cascade delete takse care of thoughts
      await Project.delete({ id: projectId?.toString() });
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  /**
   * handles BOTH archive AND unarchive
   */
  public archiveProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.body;

    try {
      // set archived status and update date
      const project = await Project.findOne({ id: projectId });
      const currBool = project?.archived;
      const newDate = currBool ? new Date() : undefined;
      await getConnection()
        .createQueryBuilder()
        .update(Project)
        .set({ archived: !currBool, archivedDate: newDate })
        .where('id = :id', { id: projectId })
        .execute();

      const projectThoughts = await getRepository(Thought)
        .createQueryBuilder('thought')
        .where('thought.projectId = :projectId', { projectId: projectId })
        .orderBy('thought.createdDate', 'ASC')
        .getMany();

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId);

      // return the updated project with its thoughts
      const updatedProject = await Project.findOne({ id: projectId });
      const data = updatedProject as any;
      data.projectThoughts = projectThoughts;
      res.status(200).send(data);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  /**
   * handle project pin and un-pin
   */
  public pinProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.body;

    try {
      // set archived status and update date
      const project = await Project.findOne({ id: projectId });
      const currBool = project?.pinned;
      const newDate = currBool ? undefined : new Date(); // only update date if pinning (no when un-pinning)
      await getConnection()
        .createQueryBuilder()
        .update(Project)
        .set({ pinned: !currBool, pinDate: newDate })
        .where('id = :id', { id: projectId })
        .execute();

      // fetch the thoughts for this project to send back to client
      const projectThoughts = await getRepository(Thought)
        .createQueryBuilder('thought')
        .where('thought.projectId = :projectId', { projectId: projectId })
        .orderBy('thought.createdDate', 'ASC')
        .getMany();

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId);

      // return the updated project with its thoughts
      const updatedProject = await Project.findOne({ id: projectId });
      const data = updatedProject as any;
      data.projectThoughts = projectThoughts;
      res.status(200).send(data);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public initProjects = async (_req: Request, res: Response): Promise<void> => {
    // const { userSub } = req.body;
    // try {

    //   await User.create({ });
    res.sendStatus(200);
    // } catch (err) {
    //   console.error(this.location, err);
    //   res.sendStatus(400);
    // }

    // const newUser = await User.create({
    //   username: 'lukehatcher',
    //   githubId: 'github|52586655',
    //   email: 'lukehatcher98@gmail.com',
    // }).save();
    // console.log(newUser);
  };
}

export default new ProjectsController();
