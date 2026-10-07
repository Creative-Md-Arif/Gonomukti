import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { collectionModelMap } from '../models/index.js';

export const adminGetAll = asyncHandler(async (req, res) => {
  const Model = collectionModelMap[req.params.collection];
  if (!Model) throw new ApiError(404, 'Collection not found.');
  const items = await Model.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: items, message: `${req.params.collection} fetched.` });
});

export const adminCreate = asyncHandler(async (req, res) => {
  const Model = collectionModelMap[req.params.collection];
  if (!Model) throw new ApiError(404, 'Collection not found.');
  const item = await Model.create(req.body);
  res.status(201).json({ success: true, data: item, message: 'Item created.' });
});

export const adminUpdate = asyncHandler(async (req, res) => {
  const Model = collectionModelMap[req.params.collection];
  if (!Model) throw new ApiError(404, 'Collection not found.');
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Item not found.');
  res.json({ success: true, data: item, message: 'Item updated.' });
});

export const adminDelete = asyncHandler(async (req, res) => {
  const Model = collectionModelMap[req.params.collection];
  if (!Model) throw new ApiError(404, 'Collection not found.');
  const item = await Model.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Item not found.');
  res.json({ success: true, data: null, message: 'Item deleted.' });
});
