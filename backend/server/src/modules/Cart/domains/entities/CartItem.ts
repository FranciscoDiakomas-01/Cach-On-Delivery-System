import { Product } from 'src/modules/Product/domains/entities/Product';
import Cart from './Cart';

export default interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  cart: Cart;
  product: Product;
}
