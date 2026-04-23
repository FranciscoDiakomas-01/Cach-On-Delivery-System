/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ICacheClient } from 'src/infra/caching/type';
import { ICategory } from '../../domains/interface';
import CategoryRepository from '../../domains/repositories';
import GetCategoryUseCase from './getCategoryUsecase';

describe('GetCategoryUseCase', () => {
  let useCase: GetCategoryUseCase;
  let repository: jest.Mocked<CategoryRepository>;
  let redis: jest.Mocked<ICacheClient>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      get: jest.fn(),
      isLugDisponible: jest.fn(),
      save: jest.fn(),
    } as any;

    redis = {
      delete: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    };

    useCase = new GetCategoryUseCase(repository, redis);
  });

  it('Should return a category list', async () => {
    const categoryMock: ICategory[] = [
      {
        createdAt: new Date(),
        description: 'First',
        title: 'First',
        id: '1',
        imageUrl: '',
        isActive: true,
        isFeatured: true,
        level: 0,
        parentId: null,
        slug: 'first-01',
        updatedAt: new Date(),
      },
    ];
    repository.get.mockResolvedValue(categoryMock);
    const result = await useCase.handle();
    const { items } = result;
    expect(items).toEqual(categoryMock);
  });
});
