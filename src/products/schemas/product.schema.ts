import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  id: String,
  name: Number,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  price: Number,
});
