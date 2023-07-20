import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProduct: Product) {
    return this.productService.create(createProduct);
  }
}
