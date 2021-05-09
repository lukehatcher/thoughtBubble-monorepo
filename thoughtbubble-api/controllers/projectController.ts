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
        .orderBy('project.createdDate', 'ASC')
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
      await this.recordActivity(userSub as string, projectId as string);
      res.sendStatus(200);
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
