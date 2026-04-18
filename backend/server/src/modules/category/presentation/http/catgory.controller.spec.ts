/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import CategoryController from './catgory.controller';
import CategoryService from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: jest.Mocked<CategoryService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            get: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get(CategoryController);
    service = module.get(CategoryService);
  });

  it('should return list', async () => {
    const mock = [{ id: '1', title: 'Tech' }];
    service.get.mockResolvedValue(mock as any);
    const result = await controller.get();
    expect(result).toEqual(mock);
  });

  it('should get by id', async () => {
    service.getById.mockResolvedValue({ id: '1' } as any);

    const result = await controller.getById('1');
    expect(result?.id).toBe('1');
  });

  it('should create', async () => {
    service.create.mockResolvedValue({ id: '1' } as any);
    const result = await controller.create({} as any);
    expect(result.id).toBe('1');
  });

  it('should update', async () => {
    service.update.mockResolvedValue({ id: '1' } as any);
    const result = await controller.update({} as any, '1');
    expect(result.id).toBe('1');
  });
});
