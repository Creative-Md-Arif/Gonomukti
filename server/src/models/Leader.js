import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const leaderSchema = new Schema({
  name: { type: String, required: true },
  designation: String,
  specialization: String,
  photo: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Leader = model('Leader', leaderSchema);
export default Leader;
