import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactMessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export const ContactMessage = model('ContactMessage', contactMessageSchema);
export default ContactMessage;
