import express from 'express';
import ActivityController from '../controllers/activityController';

const router = express.Router();

router // api/activity
  .route('/')
  .get();

export { router };
