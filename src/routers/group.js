import { Router } from 'express';
import GroupController from '../controllers/group.js';
import validateSchema from '../middleware/validation.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { groupSchema, addUsersToGroupSchema } from '../schemas/group.js';

const router = Router();

router
  .route('/')
  .get(asyncHandler(GroupController.onGetAllGroups))
  .post(validateSchema(groupSchema), asyncHandler(GroupController.onAddGroup));

router
  .route('/:id')
  .get(asyncHandler(GroupController.onGetGroup))
  .put(validateSchema(groupSchema), asyncHandler(GroupController.onUpdateGroup))
  .delete(asyncHandler(GroupController.onDeleteGroup));

router
  .route('/:id/users')
  .post(
    validateSchema(addUsersToGroupSchema),
    asyncHandler(GroupController.onAddUsersToGroup),
  );

export default router;
