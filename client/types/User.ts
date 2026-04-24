import AuthProvider from "./AuthProvider";
import Cart from "./Cart";
import Order from "./Order";
import Review from "./Review";
import UserRole from "./UserRole";

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
  reviews: Review[] | undefined;
}
