import Brand from '../entities/Brand';

export default abstract class BrandRepository {
  abstract create(data: Brand): Promise<Brand>;
  abstract findById(id: string): Promise<Brand | null>;
  abstract findBySlug(slug: string): Promise<Brand | null>;
  abstract findByTitle(title: string): Promise<Brand | null>;
  abstract getAll(): Promise<Brand[]>;
  abstract update(id: string, data: Partial<Brand>): Promise<Brand>;
  abstract activate(id: string): Promise<void>;
  abstract deactivate(id: string): Promise<void>;
  abstract existsBySlug(slug: string): Promise<boolean>;
}
