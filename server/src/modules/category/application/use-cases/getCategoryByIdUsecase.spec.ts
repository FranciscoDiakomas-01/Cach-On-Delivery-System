/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ICategory } from '../../domains/interface';
import CategoryRepository from '../../domains/repositories';
import GetCategoryByIdUseCase from './getCategoryByIdUsecase';

describe('GetCategoryByIdUseCase', () => {
  let useCase: GetCategoryByIdUseCase;
  let repository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      get: jest.fn(),
      isLugDisponible: jest.fn(),
      save: jest.fn(),
    } as any;

    useCase = new GetCategoryByIdUseCase(repository);
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
