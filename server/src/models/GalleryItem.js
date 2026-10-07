import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const galleryItemSchema = new Schema({
  image: { type: String, required: true },
  caption: String,
  category: { type: String, enum: ['health', 'wash', 'livelihoods', 'gender-youth'], default: 'health' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const GalleryItem = model('GalleryItem', galleryItemSchema);
export default GalleryItem;
