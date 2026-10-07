import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const partnerSchema = new Schema({
  name: { type: String, required: true },
  role: String,
  logo: String,
  type: { type: String, enum: ['institutional', 'alliance'], default: 'institutional' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Partner = model('Partner', partnerSchema);
export default Partner;
