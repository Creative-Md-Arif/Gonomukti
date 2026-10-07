import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {
  Banner,
  Project,
  Leader,
  Partner,
  Milestone,
  SuccessStory,
  GalleryItem,
  SiteSetting,
  ContactMessage,
  FocusArea,
  ImpactHighlight,
} from '../models/index.js';

export const getBanners = asyncHandler(async (_req, res) => {
  const items = await Banner.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: items, message: 'Banners fetched.' });
});

export const getProjects = asyncHandler(async (_req, res) => {
  const items = await Project.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: items, message: 'Projects fetched.' });
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const item = await Project.findOne({ slug: req.params.slug, isActive: true });
  if (!item) throw new ApiError(404, 'Project not found.');
  res.json({ success: true, data: item, message: 'Project fetched.' });
});

export const getLeaders = asyncHandler(async (_req, res) => {
  const items = await Leader.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: items, message: 'Leaders fetched.' });
});

export const getPartners = asyncHandler(async (_req, res) => {
  const items = await Partner.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: items, message: 'Partners fetched.' });
});

export const getImpact = asyncHandler(async (_req, res) => {
  const [milestones, stories] = await Promise.all([
    Milestone.find({ isActive: true }).sort({ order: 1 }),
    SuccessStory.find({ isActive: true }).sort({ createdAt: -1 }),
  ]);
  res.json({ success: true, data: { milestones, stories }, message: 'Impact data fetched.' });
});

export const getGallery = asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  if (req.query.category && req.query.category !== 'all') {
    filter.category = req.query.category;
  }
  const items = await GalleryItem.find(filter).sort({ order: 1 });
  res.json({ success: true, data: items, message: 'Gallery items fetched.' });
});

export const getFocusAreas = asyncHandler(async (_req, res) => {
  const items = await FocusArea.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: items, message: 'Focus areas fetched.' });
});

export const getImpactHighlights = asyncHandler(async (_req, res) => {
  const items = await ImpactHighlight.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: items, message: 'Impact highlights fetched.' });
});

export const getSettings = asyncHandler(async (_req, res) => {
  const settings = await SiteSetting.findOne();
  res.json({ success: true, data: settings, message: 'Settings fetched.' });
});

export const createContactMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.create(req.body);
  res.status(201).json({ success: true, data: msg, message: 'Message sent successfully.' });
});
