import { Injectable } from '@nestjs/common';
import CreateCategoryUseCase from '../../application/use-cases/createCategoryUsecase';
import GetCategoryByIdUseCase from '../../application/use-cases/getCategoryByIdUsecase';
import GetCategoryUseCase from '../../application/use-cases/getCategoryUsecase';
import UpdateCategoryUseCase from '../../application/use-cases/updateCategoryUseCase';
import { UpdateCategoryDto } from '../../application/dto/update';
import { CreateCategoryDto } from '../../application/dto/create';

@Injectable()
export default class CategoryService {
  constructor(
    private readonly CreateCategoryUseCase: CreateCategoryUseCase,
    private readonly GetCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly GetCategoryUseCase: GetCategoryUseCase,
    private readonly UpdateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  public async get() {
    const data = await this.GetCategoryUseCase.handle();
    return data;
  }

  public async getById(id: string) {
    const data = await this.GetCategoryByIdUseCase.handle(id);
    return {
      data,
    };
  }

  public async update(data: UpdateCategoryDto, id: string) {
    const updated = await this.UpdateCategoryUseCase.handle({
      ...data,
      id,
    });

    return {
      data: updated,
    };
  }

  public async create(data: CreateCategoryDto) {
    const created = await this.CreateCategoryUseCase.handle(data);
    return {
      data: created,
    };
  }
}
