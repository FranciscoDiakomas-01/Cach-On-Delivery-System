/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ICacheClient } from 'src/infra/caching/type';
import { ICategory } from '../../domains/interface';
import CategoryRepository from '../../domains/repositories';
import GetCategoryByIdUseCase from './getCategoryByIdUsecase';

describe('GetCategoryByIdUseCase', () => {
  let useCase: GetCategoryByIdUseCase;
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

    useCase = new GetCategoryByIdUseCase(repository, redis);
  });

  it('Should return a category by Id', async () => {
    const categoryMock: ICategory = {
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
    };

    repository.findById.mockResolvedValue(categoryMock);

    const result = await useCase.handle('1');
    expect(repository.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(categoryMock);
  });
});
