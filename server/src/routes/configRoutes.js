import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getConfig, updateConfig } from '../controllers/configController.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getConfig);
router.put('/', updateConfig);

export default router;
