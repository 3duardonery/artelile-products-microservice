import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../models/product.interface';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,
  ) {}

  async create(product: ProductDto): Promise<Product> {
    const createdProduct = this.productModel.create(product);

    return createdProduct;
  }
}
