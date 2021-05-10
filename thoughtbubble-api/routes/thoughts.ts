import express from 'express';
import ThoughtsController from '../controllers/thoughtController';

const router = express.Router();

router // api/thought
  .route('/')
  .post(ThoughtsController.createThought)
  .put(ThoughtsController.editThought)
  .delete(ThoughtsController.deleteThought);

router // api/thought/status
  .route('/status')
  .put(ThoughtsController.toggleThoughtStatus);

router // api/thought/tag
  .route('/tag')
  .put(ThoughtsController.editTag);

export { router };
