import { Router } from 'express';
import AuthController from '../controllers/auth.js';
import validateSchema from '../middleware/validation.js';
import asyncHandler from '../middleware/asyncHandler.js';
import authSchema from '../schemas/auth.js';

const router = Router();

router
  .route('/login')
  .post(validateSchema(authSchema), asyncHandler(AuthController.onLogin));

export default router;
