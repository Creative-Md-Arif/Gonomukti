import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  adminGetAll,
  adminCreate,
  adminUpdate,
  adminDelete,
} from '../controllers/crudController.js';
import { updateSettings } from '../controllers/settingsController.js';
import {
  getMessages,
  patchMessage,
  deleteMessage,
} from '../controllers/messagesController.js';
import { getDashboard } from '../controllers/dashboardController.js';

const router = Router();

router.use(authMiddleware);

router.get('/dashboard', getDashboard);
router.get('/messages', getMessages);
router.patch('/messages/:id', patchMessage);
router.delete('/messages/:id', deleteMessage);
router.put('/settings', updateSettings);

router.get('/:collection', adminGetAll);
router.post('/:collection', adminCreate);
router.put('/:collection/:id', adminUpdate);
router.delete('/:collection/:id', adminDelete);

export default router;
