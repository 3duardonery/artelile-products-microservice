import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Product } from '../models/product.interface';
import { ProductDto } from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,
  ) {}

  async create(product: ProductDto): Promise<Product> {
    const createdProduct = this.productModel.create(product);

    return createdProduct;
  }

  async getByName(name: string): Promise<Product[]> {
    return this.productModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .exec();
  }

  async update(product: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(
      product._id,
      { ...product, updatedAt: new Date() },
      {
        new: true,
      },
    );
  }
}
