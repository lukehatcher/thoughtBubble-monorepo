import { Request, Response } from 'express';
import * as db from '../database/queries';

export async function createThought(req: Request, res: Response): Promise<void> {
  const { userSub, projectId, thought } = req.body;
  db.addThought(userSub, projectId, thought)
    .then((newId) => {
      res.status(201).send(newId);
    })
    .catch((err) => {
      console.error('@thoughtControllers.ts: ', err);
      res.sendStatus(400);
    });
}

export async function deleteThought(req: Request, res: Response): Promise<void> {
  const { userSub, projectId, thoughtId } = req.query;
  db.deleteThought(userSub, projectId, thoughtId)
    .then(() => {
      console.log('database todo deletion success');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('@thoughtControllers.ts: ', err);
      res.sendStatus(400);
    });
}

export async function editThought(req: Request, res: Response): Promise<void> {
  const { userSub, projectId, thoughtId, newThought } = req.body;
  db.editThought(userSub, projectId, thoughtId, newThought)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('@thoughtControllers.ts: ', err);
      res.sendStatus(400);
    });
}

export async function toggleThoughtStatus(req: Request, res: Response): Promise<void> {
  const { userSub, projectId, thoughtId } = req.body;
  db.toggleThoughtCompletion(userSub, projectId, thoughtId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('@thoughtControllers.ts: ', err);
      res.sendStatus(400);
    });
}
