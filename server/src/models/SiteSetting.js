import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const siteSettingSchema = new Schema({
  logoLight: String,
  logoDark: String,
  favicon: String,
  heroHeadline: String,
  heroSubheadline: String,
  impactHighlights: [{ value: Number, suffix: String, label: String }],
  focusAreas: [{ title: String, description: String, icon: String }],
  briefAbout: String,
  briefAboutImage: String,
  establishedYear: { type: Number, default: 2006 },
  vision: String,
  mission: String,
  values: [{ title: String, description: String, icon: String }],
  directorMessage: {
    title: String,
    body: String,
    name: String,
    designation: String,
    photo: String,
  },
  leadershipIntro: String,
  historyText: [String],
  timeline: [{ year: String, title: String }],
  alliancesText: String,
  donate: {
    title: String,
    text: String,
    subText: String,
    buttonText: String,
  },
  contact: {
    address: String,
    hotline: String,
    workingHours: String,
    emails: [{ email: String, label: String }],
    mapEmbedUrl: String,
  },
  registrationText: String,
  socialLinks: [{ name: String, url: String }],
  mapEmbedUrl: String,
  footerAbout: String,
  // Section headers for Home page
  sectionHeaders: {
    briefAbout: { eyebrow: { type: String, default: 'Who We Are' }, title: { type: String, default: 'A Grassroots Movement for Coastal Bangladesh' } },
    focusAreas: { eyebrow: { type: String, default: 'What We Do' }, title: { type: String, default: 'Core Focus Areas' }, subtitle: { type: String, default: 'Addressing the most pressing challenges facing coastal communities through integrated, community-driven solutions.' } },
    featuredProjects: { eyebrow: { type: String, default: 'Our Work' }, title: { type: String, default: 'Featured Projects' }, subtitle: { type: String, default: 'Four flagship programs driving measurable change across health, water, livelihoods, and gender equity.' } },
    successStory: { eyebrow: { type: String, default: 'Impact Story' }, title: { type: String, default: 'Transforming Lives on the Ground' } },
    directorMessage: { eyebrow: { type: String, default: 'Leadership' }, title: { type: String, default: 'Message from the Executive Director' } },
    milestones: { eyebrow: { type: String, default: 'Our Impact' }, title: { type: String, default: 'Key Milestones' }, subtitle: { type: String, default: 'Measurable outcomes from two decades of dedicated community work in coastal Bangladesh.' } },
    partners: { eyebrow: { type: String, default: 'Network & Compliance' }, title: { type: String, default: 'Partners, Donors & Alliances' }, subtitle: { type: String, default: 'Working alongside government institutions and regional networks to maximize grassroots impact.' } },
    gallery: { eyebrow: { type: String, default: 'Moments' }, title: { type: String, default: 'Gallery Preview' }, subtitle: { type: String, default: 'Glimpses from our field operations across coastal Khulna.' } },
    impact: { eyebrow: { type: String, default: 'Our Reach' }, title: { type: String, default: 'Impact at a Glance' }, subtitle: { type: String, default: 'Two decades of measurable change across coastal Bangladesh.' } },
  },
  // Page banner images
  pageBanners: {
    about: { type: String, default: 'https://images.pexels.com/photos/27000889/pexels-photo-27000889.jpeg?auto=compress&cs=tinysrgb&w=1920' },
    projects: { type: String, default: 'https://images.pexels.com/photos/32863487/pexels-photo-32863487.jpeg?auto=compress&cs=tinysrgb&w=1920' },
    gallery: { type: String, default: 'https://images.pexels.com/photos/35188819/pexels-photo-35188819.jpeg?auto=compress&cs=tinysrgb&w=1920' },
    contact: { type: String, default: 'https://images.pexels.com/photos/37112374/pexels-photo-37112374.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  },
}, { timestamps: true });

export const SiteSetting = model('SiteSetting', siteSettingSchema);
export default SiteSetting;
