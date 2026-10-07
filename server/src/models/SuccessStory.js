import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const successStorySchema = new Schema({
  label: String,
  title: { type: String, required: true },
  location: String,
  body: String,
  image: String,
  stats: [String],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const SuccessStory = model('SuccessStory', successStorySchema);
export default SuccessStory;
