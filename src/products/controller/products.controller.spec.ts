import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductService } from '../services/product.service';
import { productProvider } from '../providers/product.provider';
import { DatabaseModule } from '../../database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration.config';

fdescribe('ProductsController', () => {
  let controller: ProductsController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductService, ...productProvider],
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        DatabaseModule,
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should return a product', async () => {
      // ARRANGE
      const request: any = {
        id: '123456',
        name: 'teste',
        description: 'Teste',
        price: 100,
        createdAt: new Date(10, 1, 2000),
        updatedAt: new Date(),
      };

      jest
        .spyOn(productService, 'create')
        .mockImplementation(async () => request);

      // ACT
      const result = await controller.create(request);

      // ASSERT
      expect(result).toBe(request);
    });
  });
});
