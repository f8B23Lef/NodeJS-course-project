import { Router } from 'express';
import UserController from '../controllers/user.js';
import validateSchema from '../middleware/validation.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { userSchema, userGetAutosuggestSchema } from '../schemas/user.js';

const router = Router();

router
  .route('/')
  .get(
    validateSchema(userGetAutosuggestSchema, false),
    asyncHandler(UserController.onGetAutosuggestedUsers),
  )
  .post(validateSchema(userSchema), asyncHandler(UserController.onAddUser));

router
  .route('/:id')
  .get(asyncHandler(UserController.onGetUser))
  .put(validateSchema(userSchema), asyncHandler(UserController.onUpdateUser))
  .delete(asyncHandler(UserController.onDeleteUser));

export default router;
