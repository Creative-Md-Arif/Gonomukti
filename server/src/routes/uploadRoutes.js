import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = Router();

router.use(authMiddleware);
router.post('/upload', uploadImage);

export default router;
