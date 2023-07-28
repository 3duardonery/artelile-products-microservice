import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDto } from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createProduct: ProductDto) {
    return this.productService.create(createProduct);
  }

  @Get()
  async getByName(@Query('name') name: string) {
    return this.productService.getByName(name);
  }

  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  async patchProduct(@Body() updateProduct: UpdateProductDto) {
    return await this.productService.update(updateProduct);
  }
}
