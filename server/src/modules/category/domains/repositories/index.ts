import Category from '../entities/category';
import { ICategory } from '../interface';

export default abstract class CategoryRepository {
  abstract get(): Promise<ICategory[]> | ICategory[];
  abstract findById(id: string): Promise<ICategory | null> | ICategory | null;
  abstract save(category: Category): Promise<void> | void;
  abstract isLugDisponible(title: string): Promise<boolean> | boolean;
  abstract getByTitle(
    title: string,
  ): Promise<ICategory | null> | ICategory | null;
  abstract toogle(id: string, status: boolean): Promise<void>;
}
