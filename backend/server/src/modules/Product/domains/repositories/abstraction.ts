import { IPagination, IPagintionProps } from 'src/core/types';
import { Product } from '../entities/Product';

export default abstract class ProductRepository {
  abstract get(pagination: IPagintionProps): Promise<IPagination<Product>>;
  abstract getByUnique(unique: string): Promise<Product | null>;
  abstract create(data: Product): Promise<Product>;
  abstract update(id: string, data: Partial<Product>): Promise<Product>;
  abstract increaseStock(productId: string, qty: number): Promise<void>;
  abstract decreaseStock(productId: string, qty: number): Promise<void>;
  abstract reserveStock(productId: string, qty: number): Promise<void>;
  abstract releaseStock(productId: string, qty: number): Promise<void>;
  abstract activate(productId: string): Promise<void>;
  abstract deactivate(productId: string): Promise<void>;
  abstract isLugDisponible(slug: string): Promise<boolean>;
  abstract incrementSellCount(productId: string, qty: number): Promise<void>;
  abstract findByCategory(
    categoryId: string,
    pagination: IPagintionProps,
  ): Promise<IPagination<Product>>;
}
