export { default as User } from './User.js';
export { default as Banner } from './Banner.js';
export { default as Project } from './Project.js';
export { default as Leader } from './Leader.js';
export { default as Partner } from './Partner.js';
export { default as Milestone } from './Milestone.js';
export { default as SuccessStory } from './SuccessStory.js';
export { default as GalleryItem } from './GalleryItem.js';
export { default as ContactMessage } from './ContactMessage.js';
export { default as SiteSetting } from './SiteSetting.js';
export { default as AppConfig } from './AppConfig.js';
export { default as FocusArea } from './FocusArea.js';
export { default as ImpactHighlight } from './ImpactHighlight.js';

import Banner from './Banner.js';
import Project from './Project.js';
import Leader from './Leader.js';
import Partner from './Partner.js';
import Milestone from './Milestone.js';
import SuccessStory from './SuccessStory.js';
import GalleryItem from './GalleryItem.js';
import ContactMessage from './ContactMessage.js';
import FocusArea from './FocusArea.js';
import ImpactHighlight from './ImpactHighlight.js';

export const collectionModelMap = {
  banners: Banner,
  projects: Project,
  leaders: Leader,
  partners: Partner,
  milestones: Milestone,
  stories: SuccessStory,
  gallery: GalleryItem,
  messages: ContactMessage,
  focusAreas: FocusArea,
  impactHighlights: ImpactHighlight,
};
