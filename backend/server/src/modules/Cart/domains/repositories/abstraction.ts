import Cart from '../entities/Cart';

export default abstract class CartRepository {
  abstract createCart(userId: string): Promise<Cart>;
  abstract getCartByUserId(userId: string): Promise<Cart | null>;
  abstract getById(id: string): Promise<Cart | null>;
  abstract deleteCart(cartId: string): Promise<void>;
  abstract addItemToCart(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<void>;
  abstract removeItemFromCart(cartId: string, productId: string): Promise<void>;
  abstract updateItemQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<void>;
  abstract markCartAsInactive(cartId: string): Promise<void>;
  abstract decreaseStock(productId: string, qty: number): Promise<void>;
  abstract reserveStock(productId: string, qty: number): Promise<void>;
  abstract releaseStock(productId: string, qty: number): Promise<void>;
}
