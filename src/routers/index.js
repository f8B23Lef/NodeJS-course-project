import { Router } from 'express';
import userRouters from './user.js';
import groupRouters from './group.js';

const router = Router();

router.use('/users', userRouters);
router.use('/groups', groupRouters);

export default router;
