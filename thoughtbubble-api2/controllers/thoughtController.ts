import { Request, Response } from 'express';
import { Thought } from '../entities/Thought';

class ThoughtsController {
  private readonly location: string;

  constructor() {
    this.location = '@thoughtControllers.ts: ';
  }

  public createThought = async (req: Request, res: Response): Promise<void> => {
    // correctly throws error is project id is not in db project table
    const { userSub, projectId, thought } = req.body;
    try {
      const newThought = await Thought.create({ text: thought, projectId }).save();
      res.send({ newThought }); // maybe just send the id
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public deleteThought = async (req: Request, res: Response): Promise<void> => {
    const { userSub, projectId, thoughtId } = req.query;
    try {
      await Thought.delete({ id: Number(thoughtId) });
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  // public async editThought(req: Request, res: Response): Promise<void> {
  //   const { userSub, projectId, thoughtId, newThought } = req.body;
  //   db.editThought(userSub, projectId, thoughtId, newThought)
  //     .then(() => {
  //       res.sendStatus(201);
  //     })
  //     .catch((err) => {
  //       console.error(this.location, err);
  //       res.sendStatus(400);
  //     });
  // }

  //   public async toggleThoughtStatus(req: Request, res: Response): Promise<void> {
  //     const { userSub, projectId, thoughtId } = req.body;
  //     db.toggleThoughtCompletion(userSub, projectId, thoughtId)
  //       .then(() => {
  //         res.sendStatus(201);
  //       })
  //       .catch((err) => {
  //         console.error(this.location, err);
  //         res.sendStatus(400);
  //       });
  //   }
}

export default new ThoughtsController();
