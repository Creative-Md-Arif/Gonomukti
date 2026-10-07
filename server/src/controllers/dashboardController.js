import { asyncHandler } from '../utils/asyncHandler.js';
import {
  Banner,
  Project,
  Leader,
  Partner,
  Milestone,
  SuccessStory,
  GalleryItem,
  ContactMessage,
  FocusArea,
  ImpactHighlight,
} from '../models/index.js';

export const getDashboard = asyncHandler(async (_req, res) => {
  const [
    banners, projects, focusAreas, impactHighlights, leaders, partners,
    milestones, stories, gallery, messages, unreadMessages,
  ] = await Promise.all([
    Banner.countDocuments(),
    Project.countDocuments(),
    FocusArea.countDocuments(),
    ImpactHighlight.countDocuments(),
    Leader.countDocuments(),
    Partner.countDocuments(),
    Milestone.countDocuments(),
    SuccessStory.countDocuments(),
    GalleryItem.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
  ]);
  res.json({
    success: true,
    data: { banners, projects, focusAreas, impactHighlights, leaders, partners, milestones, stories, gallery, messages, unreadMessages },
    message: 'Dashboard stats fetched.',
  });
});
