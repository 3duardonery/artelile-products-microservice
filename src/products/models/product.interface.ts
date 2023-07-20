import { Document } from 'mongoose';

export interface Product extends Document {
  readonly id: string;
  readonly name: number;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly price: number;
}
