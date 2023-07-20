import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { productProvider } from './providers/product.provider';
import { ProductsController } from './controller/products.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [DatabaseModule],
  providers: [...productProvider, ProductService],
  controllers: [ProductsController],
})
export class ProductsModule {}
