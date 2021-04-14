import express from 'express';
import ProjectsController from '../controllers/emailController';

const router = express.Router();

router // api/email
  .route('/')
  .post(ProjectsController.toggleDailyEmailSetting);

export default router;
