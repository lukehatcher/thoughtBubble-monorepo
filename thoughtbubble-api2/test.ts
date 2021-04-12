import axios from 'axios';

const userSub = 'github|52586655';

const testPost = async function () {
  try {
    const response = await axios.post('http://localhost:3001/api/projects', {
      userSub: '1337',
      projectName: 'testing new structure',
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

testPost();

// public async createProject(req: Request, res: Response): Promise<void> {
// 	const { userSub, projectName } = req.body;
// 	db.addProject(userSub, projectName)
// 		.then((newId) => {
// 			res.status(201).send(newId);
// 		})
// 		.catch((err) => {
// 			console.error(this.location, err);
// 			res.sendStatus(400);
// 		});
// }
