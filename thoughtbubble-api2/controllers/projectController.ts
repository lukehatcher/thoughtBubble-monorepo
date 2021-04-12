import { Request, Response } from 'express';
import { Project } from '../entities/Project';
import { User } from '../entities/User';

class ProjectsController {
  private readonly location: string;

  constructor() {
    this.location = '@projectControllers.ts: ';
  }

  // public async fetchProjects(req: Request, res: Response): Promise<void> {
  //   const { userSub } = req.query;
  //   db.getUserData(userSub)
  //     .then((data) => {
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       console.error(this.location, err);
  //       res.sendStatus(400);
  //     });
  // }

  public createProject = async (req: Request, res: Response): Promise<void> => {
    // working
    const { userSub, projectName } = req.body;
    try {
      const user = await User.findOne({ githubId: userSub }); // wack naming
      const userId = user?.id;
      const newProject = await Project.create({ projectName, userId }).save();
      res.send({ newProject }); // maybe just send the id
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<void> => {
    // working
    const { userSub, projectId } = req.query;
    try {
      await Project.delete({ id: Number(projectId) });
      res.send({ projectId }).status(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new ProjectsController();
