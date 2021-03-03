import * as express from 'express';
import { Request, Response } from 'express';
import * as morgan from 'morgan';
import * as db from '../database/queries';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/projects/fetch', (req: Request, res: Response) => {
  const { userSub } = req.query;
  db.getUserData(userSub)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error('error in server', err);
      res.sendStatus(400);
    });
});

app.post('/api/projects/init', (req, res) => {
  const { userSub } = req.body;
  if (!userSub) return res.sendStatus(400);

  // this object creating should be in queries.ts
  const data = {
    _id: uuidv4(),
    userSub,
    projects: [],
  };

  db.checkIfUserExists(userSub)
    .then((exists) => {
      if (!exists) {
        db.initUserdata(data)
          .then(() => {
            console.log('checking for user');
            res.status(201).send(data); // fix error
          })
          .catch((err) => {
            console.error('error initializing user in db', err);
          });
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => console.error(err));
});

app.delete('/api/projects/delete', (req, res) => {
  const { type, userSub, projectId, todoId } = req.query;
  if (type === 'todo') {
    // just deleting a todo from a project
    db.deleteTodo(userSub, projectId, todoId)
      .then(() => {
        console.log('database todo deletion success');
        console.log(res); // need to send back creation
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  } else if (type === 'project') {
    // deleting whole project
    db.deleteProject(userSub, projectId)
      .then(() => {
        console.log('database project deletion success');
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  }
});
// id
app.post('/api/projects/post', (req, res) => {
  const { type, userSub, projectName, projectId, todo } = req.body;
  if (type === 'todo') {
    db.addTodo(userSub, projectId, todo) // need id here
      .then((newId) => {
        res.status(201).send(newId);
      })
      .catch((err) => {
        console.error('error posting todo to db', err);
        res.sendStatus(400);
      });
  } else if (type === 'project') {
    db.addProject(userSub, projectName)
      .then((newId) => {
        res.status(201).send(newId);
      })
      .catch((err) => {
        console.error('error posting todo to db', err);
        res.sendStatus(400);
      });
  }
});

app.put('/api/projects/put', (req, res) => {
  const { type, username, projectName, todo } = req.body;
  if (type === 'todo') {
    db.toggleTodoCompletion(username, projectName, todo)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('error updating todo completion bool', err);
        res.sendStatus(400);
      });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
