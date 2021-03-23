import { Router } from 'express';
import {
  onAddUser,
  onUpdateUser,
  onGetUser,
  onDeleteUser,
  onGetAutosuggestedUsers,
} from '../controllers/user.js';
import { validateUserQuery, validateSchema } from '../middleware/validation.js';
import { userPostSchema, userPutSchema } from '../schemas/user.js';

const router = Router();

router
  .route('/')
  .get(validateUserQuery, onGetAutosuggestedUsers)
  .post(validateSchema(userPostSchema), onAddUser);

router
  .route('/:id')
  .get(onGetUser)
  .put(validateSchema(userPutSchema), onUpdateUser)
  .delete(onDeleteUser);

export default router;
