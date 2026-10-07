import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const impactHighlightSchema = new Schema({
  value: { type: Number, required: true },
  suffix: { type: String, default: '+' },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const ImpactHighlight = model('ImpactHighlight', impactHighlightSchema);
export default ImpactHighlight;
