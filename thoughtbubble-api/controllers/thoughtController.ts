import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Thought } from '../entities/Thought';
import { ControllerHelper } from './controllerHelper';

class ThoughtsController extends ControllerHelper {
  private readonly location: string;

  constructor() {
    super();
    this.location = '@thoughtControllers.ts: ';
  }

  public createThought = async (req: Request, res: Response): Promise<void> => {
    // correctly throws error is project id is not in db project table
    const { projectId, thought, creationLocation } = req.body;
    const { userId } = req;
    try {
      const newThought = await Thought.create({ text: thought, projectId, creationLocation }).save();

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId);
      // record the users activity
      await this.recordActivity(userId, projectId);

      res.send(newThought); // maybe just send the id
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public deleteThought = async (req: Request, res: Response): Promise<void> => {
    const { projectId, thoughtId } = req.query;
    try {
      await Thought.delete({ id: thoughtId?.toString() });

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId as string);

      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public editThought = async (req: Request, res: Response): Promise<void> => {
    const { projectId, thoughtId, newThought } = req.body;
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Thought)
        .set({ text: newThought })
        .where('id = :id', { id: thoughtId })
        .execute();

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId);

      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public toggleThoughtStatus = async (req: Request, res: Response): Promise<void> => {
    const { projectId, thoughtId } = req.body;
    const { userId } = req;
    try {
      const thought = await Thought.findOne({ id: thoughtId });
      const currBool = thought?.completed;
      await getConnection()
        .createQueryBuilder()
        .update(Thought)
        .set({ completed: !currBool })
        .where('id = :id', { id: thoughtId })
        .execute();

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId);
      // record the users activity
      await this.recordActivity(userId, projectId, thoughtId);

      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public editTag = async (req: Request, res: Response) => {
    const { projectId, thoughtId, tag: newtag } = req.body;
    try {
      await getConnection() //
        .createQueryBuilder()
        .update(Thought)
        .set({ tag: newtag })
        .where('id = :id', { id: thoughtId })
        .execute();

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId);

      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };
}

export default new ThoughtsController();
