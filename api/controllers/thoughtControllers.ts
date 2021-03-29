import { Request, Response } from 'express';
import * as db from '../database/queries';

class ThoughtsController {
  private readonly location: string;

  constructor() {
    this.location = '@thoughtControllers.ts: ';
  }

  public async createThought(req: Request, res: Response): Promise<void> {
    const { userSub, projectId, thought } = req.body;
    db.addThought(userSub, projectId, thought)
      .then((newId) => {
        res.status(201).send(newId);
      })
      .catch((err) => {
        console.error(this.location, err);
        res.sendStatus(400);
      });
  }

  public async deleteThought(req: Request, res: Response): Promise<void> {
    const { userSub, projectId, thoughtId } = req.query;
    db.deleteThought(userSub, projectId, thoughtId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(this.location, err);
        res.sendStatus(400);
      });
  }

  public async editThought(req: Request, res: Response): Promise<void> {
    const { userSub, projectId, thoughtId, newThought } = req.body;
    db.editThought(userSub, projectId, thoughtId, newThought)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(this.location, err);
        res.sendStatus(400);
      });
  }

  public async toggleThoughtStatus(req: Request, res: Response): Promise<void> {
    const { userSub, projectId, thoughtId } = req.body;
    db.toggleThoughtCompletion(userSub, projectId, thoughtId)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(this.location, err);
        res.sendStatus(400);
      });
  }
}

export default new ThoughtsController();
