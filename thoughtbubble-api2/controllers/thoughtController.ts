import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
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

  public editThought = async (req: Request, res: Response): Promise<void> => {
    const { userSub, projectId, thoughtId, newThought } = req.body;
    try {
      await getConnection() //
        .createQueryBuilder()
        .update(Thought)
        .set({ text: newThought })
        .where('id = :id', { id: thoughtId })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public toggleThoughtStatus = async (req: Request, res: Response): Promise<void> => {
    const { userSub, projectId, thoughtId } = req.body;
    try {
      const thought = await Thought.findOne({ id: thoughtId });
      const currBool = thought?.completed;
      await getConnection() //
        .createQueryBuilder()
        .update(Thought)
        .set({ completed: !currBool })
        .where('id = :id', { id: thoughtId })
        .execute();
      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new ThoughtsController();
