import { Router } from 'express';
import userRouters from './user.js';

const router = Router();

router.use('/users', userRouters);

export default router;
