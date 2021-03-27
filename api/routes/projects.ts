import * as express from 'express';
import * as controllers from '../controllers/projectControllers';

const router = express.Router();

// api/projects
router
  .route('/')
  .get(controllers.fetchProjects) // fetch (literally the only app.get)
  .post(controllers.createProject)
  .delete(controllers.deleteProject);

// api/projects/init
router
  .route('/init') //
  .post(controllers.initProjects);

export default router;
