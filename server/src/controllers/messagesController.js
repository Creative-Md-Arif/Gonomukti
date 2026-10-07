import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ContactMessage } from '../models/index.js';

export const getMessages = asyncHandler(async (_req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ success: true, data: messages, message: 'Messages fetched.' });
});

export const patchMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { isRead: req.body.isRead },
    { new: true }
  );
  if (!msg) throw new ApiError(404, 'Message not found.');
  res.json({ success: true, data: msg, message: 'Message updated.' });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) throw new ApiError(404, 'Message not found.');
  res.json({ success: true, data: null, message: 'Message deleted.' });
});
