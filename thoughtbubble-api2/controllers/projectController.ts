import 'reflect-metadata';
import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Project } from '../entities/Project';
import { Thought } from '../entities/Thought';
import { User } from '../entities/User';

class ProjectsController {
  private readonly location: string;

  constructor() {
    this.location = '@projectControllers.ts: ';
  }

  public fetchProjects = async (req: Request, res: Response): Promise<void> => {
    const userSub = req.query.userSub as string;
    try {
      const user = await User.findOne({ githubId: userSub }); // wack naming
      const userIdx = user?.id;
      console.log('___start___');
      const usersProjects = await getRepository(Project) //
        .createQueryBuilder('project')
        .where('project.userId = :userId', { userId: userIdx })
        .orderBy('project.createdDate', 'ASC')
        .getMany();
      console.log('___end___');
      console.log(JSON.stringify(usersProjects));

      console.log('___start___');
      let data: any[] = usersProjects as any[];
      console.log(usersProjects);
      for (let i = 0; i < data.length; i++) {
        const projectIdx = data[i].id;
        const projectThoughts = await getRepository(Thought) //
          .createQueryBuilder('thought')
          .where('thought.projectId = :projectId', { projectId: projectIdx })
          .orderBy('thought.createdDate', 'ASC')
          .getMany();
        const projectThoughts2 = projectThoughts as any[];
        data[i].projectThoughts = projectThoughts2; // thoughts is a keyword
        console.log('___end___');
      }
      console.log(JSON.stringify(data));

      res.send(data).status(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public createProject = async (req: Request, res: Response): Promise<void> => {
    // working
    const { userSub, projectName } = req.body;
    try {
      const user = await User.findOne({ githubId: userSub }); // wack naming
      const userId = user?.id;
      const newProject = await Project.create({ projectName, userId }).save();
      res.send(newProject); // maybe just send the id
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<void> => {
    // working
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
}

export default new ProjectsController();
