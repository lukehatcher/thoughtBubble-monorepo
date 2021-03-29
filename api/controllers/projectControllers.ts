import { Request, Response } from 'express';
import * as db from '../database/queries';

class ProjectsController {
  private readonly location: string;

  constructor() {
    this.location = '@projectControllers.ts: ';
  }

  public async fetchProjects(req: Request, res: Response): Promise<void> {
    const { userSub } = req.query;
    db.getUserData(userSub)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error(this.location, err);
        res.sendStatus(400);
      });
  }

  public async createProject(req: Request, res: Response): Promise<void> {
    const { userSub, projectName } = req.body;
    db.addProject(userSub, projectName)
      .then((newId) => {
        res.status(201).send(newId);
      })
      .catch((err) => {
        console.error(this.location, err);
        res.sendStatus(400);
      });
  }

  public async deleteProject(req: Request, res: Response): Promise<void> {
    const { userSub, projectId } = req.query;
    db.deleteProject(userSub, projectId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(this.location, err);
        res.sendStatus(400);
      });
  }

  public async initProjects(req: Request, res: Response): Promise<void> {
    const { userSub } = req.body;
    if (!userSub) {
      res.sendStatus(400);
      return;
    }
    db.checkIfUserExists(userSub)
      .then((exists) => {
        if (!exists) {
          db.initUserdata(userSub, [])
            .then((newData) => {
              res.status(201).send(newData);
            })
            .catch((err) => console.error(this.location, err));
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => console.error(this.location, err));
  }
}

export default new ProjectsController();
