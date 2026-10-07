import { type LucideIcon } from 'lucide-react';
import {
  Heart, Droplets, Sprout, Users, ShieldCheck, HandHeart,
  Scale, Leaf, Activity, GraduationCap, Waves, CloudSun,
} from 'lucide-react';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'list' | 'image';
  options?: string[];
  placeholder?: string;
}

export interface CollectionConfig {
  label: string;
  fields: FieldConfig[];
  displayFields: string[];
}

export const iconMap: Record<string, LucideIcon> = {
  Heart, Droplets, Sprout, Users, ShieldCheck, HandHeart,
  Scale, Leaf, Activity, GraduationCap, Waves, CloudSun,
};

export const iconNames = Object.keys(iconMap);

export const collectionConfigs: Record<string, CollectionConfig> = {
  banners: {
    label: 'Banner',
    displayFields: ['title', 'order', 'isActive'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'ctaText', label: 'CTA Text', type: 'text' },
      { name: 'ctaLink', label: 'CTA Link', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'isActive', label: 'Active', type: 'boolean' },
    ],
  },
  projects: {
    label: 'Project',
    displayFields: ['title', 'slug', 'isActive'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (auto from title if empty)', type: 'text' },
      { name: 'icon', label: 'Icon', type: 'select', options: iconNames },
      { name: 'focus', label: 'Focus', type: 'textarea' },
      { name: 'activities', label: 'Activities (one per line)', type: 'list' },
      { name: 'coverImage', label: 'Cover Image', type: 'image' },
      { name: 'gallery', label: 'Gallery Images (one per line)', type: 'list' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'isFeatured', label: 'Featured', type: 'boolean' },
      { name: 'isActive', label: 'Visible', type: 'boolean' },
    ],
  },
  leaders: {
    label: 'Leader',
    displayFields: ['name', 'designation', 'isActive'],
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'designation', label: 'Designation', type: 'text' },
      { name: 'specialization', label: 'Specialization', type: 'text' },
      { name: 'photo', label: 'Photo', type: 'image' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'isActive', label: 'Visible', type: 'boolean' },
    ],
  },
  partners: {
    label: 'Partner',
    displayFields: ['name', 'type', 'isActive'],
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'logo', label: 'Logo', type: 'image' },
      { name: 'type', label: 'Type', type: 'select', options: ['institutional', 'alliance'] },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'isActive', label: 'Visible', type: 'boolean' },
    ],
  },
  milestones: {
    label: 'Milestone',
    displayFields: ['label', 'value', 'isActive'],
    fields: [
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'suffix', label: 'Suffix', type: 'text', placeholder: '+' },
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'isActive', label: 'Visible', type: 'boolean' },
    ],
  },
  stories: {
    label: 'Success Story',
    displayFields: ['title', 'isFeatured', 'isActive'],
    fields: [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'stats', label: 'Stats (one per line)', type: 'list' },
      { name: 'isFeatured', label: 'Featured', type: 'boolean' },
      { name: 'isActive', label: 'Visible', type: 'boolean' },
    ],
  },
  gallery: {
    label: 'Gallery Item',
    displayFields: ['caption', 'category', 'isActive'],
    fields: [
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'caption', label: 'Caption', type: 'text' },
      { name: 'category', label: 'Category', type: 'select', options: ['health', 'wash', 'livelihoods', 'gender-youth'] },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'isActive', label: 'Visible', type: 'boolean' },
    ],
  },
  focusAreas: {
    label: 'Focus Area',
    displayFields: ['title', 'icon', 'isActive'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'icon', label: 'Icon', type: 'select', options: iconNames },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'isActive', label: 'Visible', type: 'boolean' },
    ],
  },
  impactHighlights: {
    label: 'Impact Highlight',
    displayFields: ['label', 'value', 'isActive'],
    fields: [
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'suffix', label: 'Suffix', type: 'text', placeholder: '+' },
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'isActive', label: 'Visible', type: 'boolean' },
    ],
  },
};

export const adminTabs = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'banners', label: 'Banners' },
  { key: 'projects', label: 'Projects' },
  { key: 'focusAreas', label: 'Focus Areas' },
  { key: 'impactHighlights', label: 'Impact Highlights' },
  { key: 'leaders', label: 'Leaders' },
  { key: 'partners', label: 'Partners' },
  { key: 'milestones', label: 'Milestones' },
  { key: 'stories', label: 'Success Stories' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'messages', label: 'Messages' },
  { key: 'settings', label: 'Settings' },
  { key: 'config', label: 'Configuration' },
] as const;
