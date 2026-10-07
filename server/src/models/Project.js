import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const projectSchema = new Schema({
  slug: { type: String, unique: true },
  title: { type: String, required: true },
  icon: { type: String, default: 'Heart' },
  focus: String,
  activities: [String],
  coverImage: String,
  gallery: [String],
  order: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

projectSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export const Project = model('Project', projectSchema);
export default Project;
