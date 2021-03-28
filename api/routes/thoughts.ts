import * as express from 'express';
import ThoughtsController from '../controllers/thoughtControllers';

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
