/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ICacheClient } from 'src/infra/caching/type';
import CategoryRepository from '../../domains/repositories';
import CreateCategoryUseCase from './createCategoryUsecase';
import { CreateCategoryDto } from '../dto/create';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let repository: jest.Mocked<CategoryRepository>;
  let redis: jest.Mocked<ICacheClient>;
  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      get: jest.fn(),
      isLugDisponible: jest.fn(),
      save: jest.fn(),
      getByTitle: jest.fn(),
    } as any;
    redis = {
      delete: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    };
    useCase = new CreateCategoryUseCase(repository, redis);
  });

  it('should create a new category', async () => {
    const input: CreateCategoryDto = {
      description: 'Computers',
      title: 'Computers',
      imageUrl: '',
      isActive: true,
      isFeatured: true,
      level: 0,
      parentId: undefined,
    };

    repository.save.mockResolvedValue({
      id: '1',
      ...input,
    } as any);

    const result = await useCase.handle(input);
    expect(repository.save).toHaveBeenCalled();
    expect(result.title).toBe(input.title);
    expect(result.title).toBe(input.title);
  });
});
