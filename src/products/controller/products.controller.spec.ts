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

  const listProducts = [mockProduct];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(createdProduct),
            getByName: jest.fn().mockResolvedValue(listProducts),
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

  describe('#getByName', () => {
    it('should list by name', async () => {
      // ARRANGE
      const getByNameSpy = jest
        .spyOn(productService, 'getByName')
        .mockResolvedValueOnce(listProducts);

      // ACT
      const result = await controller.getByName('test');

      // ASSERT
      expect(getByNameSpy).toHaveBeenCalledWith('test');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
