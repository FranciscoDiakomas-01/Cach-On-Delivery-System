import { IUseCase } from 'src/core/types';
import { ICategory } from '../../domains/interface';
import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '../../../../core/constants';
import CategoryRepository from '../../domains/repositories';

@Injectable()
export default class GetCategoryByIdUseCase implements IUseCase<
  string,
  ICategory | null
> {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepository,
  ) {}

  public async handle(id: string): Promise<ICategory | null> {
    return await this.repository.findById(id);
  }
}
