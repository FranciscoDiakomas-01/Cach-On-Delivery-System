/* eslint-disable @typescript-eslint/no-unsafe-argument */
import CategoryService from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  let createUC: { handle: jest.Mock };
  let getUC: { handle: jest.Mock };
  let getByIdUC: { handle: jest.Mock };
  let updateUC: { handle: jest.Mock };

  beforeEach(() => {
    createUC = { handle: jest.fn() };
    getUC = { handle: jest.fn() };
    getByIdUC = { handle: jest.fn() };
    updateUC = { handle: jest.fn() };

    service = new CategoryService(
      createUC as any,
      getByIdUC as any,
      getUC as any,
      updateUC as any,
    );
  });

  it('should return categories list', async () => {
    const mock = [{ id: '1', title: 'Tech' }];

    getUC.handle.mockResolvedValue(mock);

    const result = await service.get();

    expect(getUC.handle).toHaveBeenCalled();
    expect(result).toEqual(mock);
  });

  it('should return category by id', async () => {
    const mock = { id: '1', title: 'Tech' };

    getByIdUC.handle.mockResolvedValue(mock);

    const result = await service.getById('1');

    expect(getByIdUC.handle).toHaveBeenCalledWith('1');
    expect(result).toEqual({ data: mock });
  });

  it('should create category', async () => {
    const input = {
      title: 'Tech',
      description: '',
      imageUrl: '',
      isActive: true,
      isFeatured: false,
      level: 0,
      parentId: undefined,
    };

    const mock = { id: '1', ...input };

    createUC.handle.mockResolvedValue(mock);

    const result = await service.create(input);

    expect(createUC.handle).toHaveBeenCalledWith(input);
    expect(result).toEqual({ data: mock });
  });

  it('should update category', async () => {
    const input = {
      title: 'Updated',
      description: '',
      imageUrl: '',
      isActive: true,
      isFeatured: false,
      level: 0,
      parentId: undefined,
    };

    const mock = { id: '1', ...input };

    updateUC.handle.mockResolvedValue(mock);

    const result = await service.update(input, '1');

    expect(updateUC.handle).toHaveBeenCalledWith({
      ...input,
      id: '1',
    });

    expect(result).toEqual({ data: mock });
  });
});
