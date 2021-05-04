import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Thought } from '../entities/Thought';
import { Project } from '../entities/Project';

class ThoughtsController {
  private readonly location: string;

  constructor() {
    this.location = '@thoughtControllers.ts: ';
  }

  private updateLastUpdatedDate = async function (projectId: string) {
    // on thought addition, deletion, edit, or tag edit
    await getConnection()
      .createQueryBuilder()
      .update(Project)
      .set({ lastUpdatedDate: new Date() })
      .where('id = :id', { id: projectId })
      .execute();
  };

  public createThought = async (req: Request, res: Response): Promise<void> => {
    // correctly throws error is project id is not in db project table
    const { userSub, projectId, thought, creationLocation } = req.body;
    try {
      const newThought = await Thought.create({ text: thought, projectId, creationLocation }).save();

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId);

      res.send(newThought); // maybe just send the id
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  // create
  // delete
  // tag
  // change status
  // edit

  public deleteThought = async (req: Request, res: Response): Promise<void> => {
    const { userSub, projectId, thoughtId } = req.query;
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
    const { userSub, projectId, thoughtId, newThought } = req.body;
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

      // update datetime stamp for most recent activity for that project
      await this.updateLastUpdatedDate(projectId);

      res.sendStatus(200);
    } catch (err) {
      console.error(this.location, err);
      res.sendStatus(400);
    }
  };

  public editTag = async (req: Request, res: Response) => {
    const { userSub, projectId, thoughtId, tag: newtag } = req.body;
    try {
      const thought = await Thought.findOne({ id: thoughtId });
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
