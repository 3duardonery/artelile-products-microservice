import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { productProvider } from '../providers/product.provider';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import configuration from '../../config/configuration.config';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ...productProvider],
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        DatabaseModule,
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
