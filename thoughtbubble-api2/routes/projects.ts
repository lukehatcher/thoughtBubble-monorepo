import express from 'express';
import ProjectsController from '../controllers/projectController';

const router = express.Router();

// api/projects
router
  .route('/')
  // .get(ProjectsController.fetchProjects)
  .post(ProjectsController.createProject) // working
  .delete(ProjectsController.deleteProject); // working

// api/projects/init
// not tested
// router
//   .route('/init') //
//   .post(ProjectsController.initProjects);

export default router;
