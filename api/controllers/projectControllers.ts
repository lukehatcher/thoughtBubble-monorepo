import { Request, Response } from 'express';
import * as db from '../database/queries';

export async function fetchProjects(req: Request, res: Response): Promise<void> {
  const { userSub } = req.query;
  db.getUserData(userSub)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error('@projectControllers.ts: ', err);
      res.sendStatus(400);
    });
}

export async function createProject(req: Request, res: Response): Promise<void> {
  const { userSub, projectName } = req.body;
  db.addProject(userSub, projectName)
    .then((newId) => {
      res.status(201).send(newId);
    })
    .catch((err) => {
      console.error('@projectControllers.ts: ', err);
      res.sendStatus(400);
    });
}

export async function deleteProject(req: Request, res: Response): Promise<void> {
  const { userSub, projectId } = req.query;
  db.deleteProject(userSub, projectId)
    .then(() => {
      console.log('database project deletion success');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('@projectControllers.ts: ', err);
      res.sendStatus(400);
    });
}

export async function initProjects(req: Request, res: Response): Promise<void> {
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
            console.log('checking for user');
            res.status(201).send(newData);
          })
          .catch((err) => {
            console.error('@projectControllers.ts: ', err);
          });
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => console.error('@projectControllers.ts: ', err));
}
