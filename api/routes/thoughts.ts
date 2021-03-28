import * as express from 'express';
import * as controllers from '../controllers/thoughtControllers';

const router = express.Router();

// api/thought
router
  .route('/')
  .post(controllers.createThought)
  .put(controllers.editThought)
  .delete(controllers.deleteThought);

// api/thought/status
router
  .route('/status') //
  .put(controllers.toggleThoughtStatus);

export default router;
