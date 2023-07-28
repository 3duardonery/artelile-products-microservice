import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { productProvider } from '../providers/product.provider';
import { ProductDto } from '../dto/product.dto';
import { Model } from 'mongoose';
import { Product } from '../models/product.interface';
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let model: any;

  const mockedProduct = {
    name: 'Product 1',
    description: 'Description',
    price: 4,
    createdAt: new Date(10, 1, 2022),
  };

  const updatedMockedProduct = {
    name: 'Product 1 Updated',
    description: 'Description',
    price: 4,
    createdAt: new Date(10, 1, 2022),
    updatedAt: new Date(11, 1, 2023),
  };

  const token = 'PRODUCT_MODEL';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        ...productProvider,
        {
          provide: token,
          useValue: {
            new: jest.fn().mockResolvedValue(mockedProduct),
            constructor: jest.fn().mockResolvedValue(mockedProduct),
            find: jest.fn(),
            create: jest.fn().mockReturnValue(mockedProduct),
            findByIdAndUpdate: jest.fn().mockReturnValue(updatedMockedProduct),
          },
        },
      ],
      imports: [],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<Model<Product>>(token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should create a product', async () => {
      // ARRANGE
      const createProduct: ProductDto = {
        description: 'Product 1',
        name: 'Description',
        price: 4,
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockedProduct));

      // ACT
      const result = await service.create(createProduct);

      // ASSERT
      expect(result).toBe(mockedProduct);
    });
  });

  describe('#update', () => {
    it('should update a name of product', async () => {
      // ARRANGE
      const updateCreateProduct: UpdateProductDto = {
        description: 'Product 1',
        name: 'Description',
        price: 4,
        _id: '123456',
      };
      // ACT
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockImplementationOnce(() => Promise.resolve(updatedMockedProduct));

      const result = await service.update(updateCreateProduct);

      // ASSERT
      expect(result).toBe(updatedMockedProduct);
    });
  });
});
