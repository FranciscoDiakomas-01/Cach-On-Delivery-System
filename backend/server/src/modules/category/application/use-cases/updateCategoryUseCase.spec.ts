/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ICacheClient } from 'src/infra/caching/type';
import CategoryRepository from '../../domains/repositories';
import UpdateCategoryUseCase from './updateCategoryUseCase';

describe('UpdateCategoryUseCase', () => {
  let updatUseCase: UpdateCategoryUseCase;
  let repository: jest.Mocked<CategoryRepository>;
  let redis: jest.Mocked<ICacheClient>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      save: jest.fn(),
      isLugDisponible: jest.fn(),
      getByTitle: jest.fn(),
    } as any;

    redis = {
      delete: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    };
    updatUseCase = new UpdateCategoryUseCase(repository, redis);
  });

  it('should update existing category', async () => {
    repository.findById.mockResolvedValue({
      id: '1',
      title: 'First',
    } as any);

    repository.save.mockResolvedValue({
      id: '1',
      title: 'Updated',
    } as any);

    const result = await updatUseCase.handle({
      id: '1',
      title: 'Updated',
      description: '',
      imageUrl: '',
      isActive: true,
      isFeatured: true,
    });

    expect(repository.save).toHaveBeenCalled();
    expect(result.title).toBe('Updated');
  });

  it('should throw if category does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(
      updatUseCase.handle({
        id: '999',
        title: 'X',
        description: '',
        imageUrl: '',
        isActive: true,
        isFeatured: true,
      }),
    ).rejects.toThrow();
  });
});
