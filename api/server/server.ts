import * as express from 'express';
import * as morgan from 'morgan';
import * as db from '../database/database';

const PORT = 3001 || process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/projects/fetch', (req, res) => {
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

// ==========
app.post('/api/projects/init', (req, res) => {
  const { userSub } = req.body;
  if (!userSub) return res.sendStatus(400);

  const data = {
    userSub,
    projects: [],
  };

  // const data = {
  //   userSub,
  //   projects: [
  //     {
  //       projectName: 'app1',
  //       todos: [
  //         { text: 'build', completed: false },
  //         { text: 'edit', completed: false },
  //         { text: 'compile', completed: true },
  //       ],
  //     },
  //     {
  //       projectName: 'app12',
  //       todos: [
  //         { text: 'do the thing', completed: false },
  //         { text: 'do more', completed: false },
  //         { text: 'get it', completed: true },
  //       ],
  //     },
  //   ],
  // };

  db.checkIfUserExists(userSub) // force break
    .then((exists) => {
      if (!exists) {
        db.initUserdata(data)
          .then(() => {
            res.sendStatus(201);
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
// ==========

app.delete('/api/projects/delete', (req, res) => {
  const { type, username, projectName, todo } = req.query;
  if (type === 'todo') {
    // just deleting a todo from a project
    db.deleteTodo(username, projectName, todo)
      .then(() => {
        console.log('database todo deletion sucess'); // jon doe
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  } else if (type === 'project') {
    // deleting whole project
    db.deleteProject(username, projectName)
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

app.post('/api/projects/post', (req, res) => {
  const { type, username, projectName, todo } = req.body;
  if (type === 'todo') {
    db.addTodo(username, projectName, todo)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('error posting todo to db', err);
        res.sendStatus(400);
      });
  } else if (type === 'project') {
    db.addProject(username, projectName)
      .then(() => {
        res.sendStatus(201);
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
