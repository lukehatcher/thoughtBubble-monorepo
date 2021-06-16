import express from 'express';
import ProjectsController from '../controllers/projectController';

const router = express.Router();

// api/projects
router
  .route('/')
  .get(ProjectsController.fetchProjects)
  .post(ProjectsController.createProject)
  .delete(ProjectsController.deleteProject);

// api/projects/archive
router
  .route('/archive') //
  .put(ProjectsController.archiveProject);

// api/projects/pin
router
  .route('/pin') //
  .put(ProjectsController.pinProject);

export { router };
