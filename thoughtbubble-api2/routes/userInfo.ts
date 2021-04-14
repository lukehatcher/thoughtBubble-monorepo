import express from 'express';
import ProjectsController from '../controllers/userInfoController';

const router = express.Router();

router // api/userinfo
  .route('/')
  .get(ProjectsController.fetchUserInfo);

router // api/userinfo/email
  .route('/email')
  .put(ProjectsController.toggleDailyEmailSetting);

export default router;
