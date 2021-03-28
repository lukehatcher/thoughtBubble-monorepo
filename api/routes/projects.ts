import * as express from 'express';
import ProjectsController from '../controllers/projectControllers';

const router = express.Router();

// api/projects
router
  .route('/')
  .get(ProjectsController.fetchProjects)
  .post(ProjectsController.createProject)
  .delete(ProjectsController.deleteProject);

// api/projects/init
// not tested
router
  .route('/init') //
  .post(ProjectsController.initProjects);

export default router;
