import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const milestoneSchema = new Schema({
  value: { type: Number, required: true },
  suffix: { type: String, default: '+' },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Milestone = model('Milestone', milestoneSchema);
export default Milestone;
