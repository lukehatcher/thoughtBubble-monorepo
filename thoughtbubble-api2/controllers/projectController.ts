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

  public async createProject(req: Request, res: Response): Promise<void> {
    // working
    const { userSub, projectName } = req.body;
    try {
      const user = await User.findOne({ githubId: userSub }); // wack naming
      const newProject = await Project.create({ projectName, userId: user?.id }).save();
      res.send({ newProject }); // maybe just send the id
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  }

  // public async deleteProject(req: Request, res: Response): Promise<void> {
  //   const { userSub, projectId } = req.query;
  // 	try {
  // 		const user = await User.findOne({ githubId: userSub }); // wack naming
  // 		const newProject = await Project.create({ projectName, userId: user?.id }).save();
  // 		res.send({ newProject });
  // 	} catch (err) {
  // 		console.error(this.location, err);
  // 		res.sendStatus(400);
  // 	}
  // }
}

export default new ProjectsController();
