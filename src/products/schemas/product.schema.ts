import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: Date,
  price: Number,
});
