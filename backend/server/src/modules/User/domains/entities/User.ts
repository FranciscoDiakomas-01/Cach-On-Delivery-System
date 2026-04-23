import AuthProvider from 'src/modules/Auth/domains/entities/AuthProvider';
import UserRole from './UserRole';
import Cart from 'src/modules/Cart/domains/entities/Cart';
import Order from 'src/modules/Order/domain/entities/Order';
import Event from 'src/modules/Event/domains/entities/Event';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string | null;
  role: UserRole;
  authProvider: AuthProvider;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  cart: Cart[] | undefined;
  notifications: undefined;
  events: Event[] | undefined;
  customerOrders: Order[] | undefined;
  deliveryOrders: Order[] | undefined;
}
