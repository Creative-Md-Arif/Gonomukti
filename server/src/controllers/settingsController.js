import { asyncHandler } from '../utils/asyncHandler.js';
import { SiteSetting } from '../models/index.js';

export const updateSettings = asyncHandler(async (req, res) => {
  const existing = await SiteSetting.findOne();
  if (existing) {
    Object.assign(existing, req.body);
    await existing.save();
    res.json({ success: true, data: existing, message: 'Settings updated.' });
  } else {
    const settings = await SiteSetting.create(req.body);
    res.status(201).json({ success: true, data: settings, message: 'Settings created.' });
  }
});
