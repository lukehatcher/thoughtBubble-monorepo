import express from 'express';
import UserInfoController from '../controllers/userInfoController';

const router = express.Router();

router // api/userinfo
  .route('/')
  .get(UserInfoController.fetchOrSetUser);

router // api/userinfo/email
  .route('/dailyemail')
  .put(UserInfoController.toggleDailyEmailSetting);

router // api/userinfo/email
  .route('/weeklyemail')
  .put(UserInfoController.toggleWeeklyEmailSetting);

router // api/userinfo/email
  .route('/darkmode')
  .put(UserInfoController.toggleDarkMode);

router // api/userinfo/
  .route('/projectOrder')
  .put(UserInfoController.updateProjectOrder);

router // api/userinfo/
  .route('/projectDirection')
  .put(UserInfoController.updateProjectDirection);

router // api/userinfo/
  .route('/saveOrder')
  .put(UserInfoController.toggleProjectOrderSetting);

export { router };
