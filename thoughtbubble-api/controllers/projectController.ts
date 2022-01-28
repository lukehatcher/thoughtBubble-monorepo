import 'reflect-metadata';
import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Project } from '../entities/Project';
import { Thought } from '../entities/Thought';
import { ControllerHelper } from './controllerHelper';

class ProjectsController extends ControllerHelper {
  private readonly location: string;

  public constructor() {
    super();
    this.location = '@projectControllers.ts: ';
  }

  public fetchProjects = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req;

    // check redis cache // TODO
    // const cacheKey = `projects:${userId}`;
    // const cacheResponse = await this.cacheGet(cacheKey);
    // if (cacheResponse) {
    //   res.send(JSON.parse(cacheResponse));
    //   return;
    // }

    try {
      const usersProjects = await getRepository(Project) //
        .createQueryBuilder('project')
        .where('project.userId = :userId', { userId: userId })
        .orderBy('project.lastUpdatedDate', 'DESC')
        .getMany();

      const data: any[] = usersProjects as any[];
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
      // set redis cache // TODO
      // this.cacheSet(cacheKey, JSON.stringify(data));
      // send response to client
      res.send(data).status(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public createProject = async (req: Request, res: Response): Promise<void> => {
    const { projectName, creationLocation } = req.body;
    const { userId } = req;
    try {
      const newProject = await Project.create({ projectName, userId, creationLocation }).save();
      await this.recordActivity(userId, newProject.id);
      res.send(newProject);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
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
      const newDate = currBool ? undefined : new Date();
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
}

export default new ProjectsController();
