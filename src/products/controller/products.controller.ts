import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createProduct: ProductDto) {
    return this.productService.create(createProduct);
  }
}
