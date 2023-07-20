import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { productProvider } from './providers/product.provider';
import { ProductsController } from './controller/products.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...productProvider],
  controllers: [ProductsController],
})
export class ProductsModule {}
