import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bannerSchema = new Schema({
  title: { type: String, required: true },
  subtitle: String,
  image: String,
  ctaText: String,
  ctaLink: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Banner = model('Banner', bannerSchema);
export default Banner;
