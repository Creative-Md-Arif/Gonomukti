import { Router } from 'express';
import { validateContact } from '../middlewares/validate.js';
import rateLimit from 'express-rate-limit';
import {
  getBanners,
  getProjects,
  getProjectBySlug,
  getLeaders,
  getPartners,
  getImpact,
  getGallery,
  getSettings,
  getFocusAreas,
  getImpactHighlights,
  createContactMessage,
} from '../controllers/publicController.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many messages. Try again later.' },
});

router.get('/banners', getBanners);
router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);
router.get('/leaders', getLeaders);
router.get('/partners', getPartners);
router.get('/impact', getImpact);
router.get('/gallery', getGallery);
router.get('/focus-areas', getFocusAreas);
router.get('/impact-highlights', getImpactHighlights);
router.get('/settings', getSettings);
router.post('/contact', contactLimiter, validateContact, createContactMessage);

export default router;
