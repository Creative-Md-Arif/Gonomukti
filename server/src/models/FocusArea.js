import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const focusAreaSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Heart' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const FocusArea = model('FocusArea', focusAreaSchema);
export default FocusArea;
