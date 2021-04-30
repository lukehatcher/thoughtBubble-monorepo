import express from 'express';
import ProjectsController from '../controllers/userInfoController';

const router = express.Router();

router // api/userinfo
  .route('/')
  .get(ProjectsController.fetchUserInfo);

router // api/userinfo/email
  .route('/dailyemail')
  .put(ProjectsController.toggleDailyEmailSetting);

router // api/userinfo/email
  .route('/weeklyemail')
  .put(ProjectsController.toggleWeeklyEmailSetting);

router // api/userinfo/email
  .route('/darkmode')
  .put(ProjectsController.toggleDarkMode);

export default router;
