import express from 'express';
import ThoughtsController from '../controllers/thoughtController';

const router = express.Router();

// api/thought
router
  .route('/')
  .post(ThoughtsController.createThought)
  .put(ThoughtsController.editThought)
  .delete(ThoughtsController.deleteThought);

// api/thought/status
router
  .route('/status') //
  .put(ThoughtsController.toggleThoughtStatus);

export default router;
