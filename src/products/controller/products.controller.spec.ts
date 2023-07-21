import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductService } from '../services/product.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productService: ProductService;

  const createdProduct: any = {
    name: '',
    description: '',
    createdAt: new Date(20, 7, 2022),
    price: 0.45,
  };

  const mockProduct: any = {
    name: '',
    description: '',
    createdAt: new Date(20, 7, 2022),
    price: 0.45,
    id: '123456',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(createdProduct),
          },
        },
      ],
      imports: [],
    }).compile();

    productService = module.get<ProductService>(ProductService);

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should return a product', async () => {
      const createSpy = jest
        .spyOn(productService, 'create')
        .mockResolvedValueOnce(mockProduct);

      // ACT
      await controller.create(createdProduct);

      // ASSERT
      expect(createSpy).toHaveBeenCalledWith(createdProduct);
    });
  });
});
