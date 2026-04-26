import Order from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Paymethod } from "@/types/Paymethod";

export const ordersMock: Order[] = [
  {
    id: "ORD-001",
    customerId: "u1",
    deliveryManId: "u3",
    status: OrderStatus.PENDING,
    cartId: "c1",
    couponId: undefined,
    subtotal: 12000,
    discount: 0,
    total: 12000,
    paymentMethod: Paymethod.CASH,
    paidAt: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),

    customer: {
      id: "u1",
      firstName: "João",
      lastName: "Silva",
      email: "joao@gmail.com",
    } as any,
    // redundante no teu model

    deliveryman: {
      id: "u3",
      firstName: "Carlos",
      lastName: "Mendes",
      email: "delivery@gmail.com",
    } as any,

    address: {
      street: "Rua 1",
      city: "Luanda",
    } as any,

    cart: {
      items: [
        { id: "p1", quantity: 1 },
        { id: "p2", quantity: 2 },
      ],
    } as any,

    coupon: undefined,
  },

  {
    id: "ORD-002",
    customerId: "u2",
    deliveryManId: "u4",
    status: OrderStatus.DELIVERED,
    cartId: "c2",
    couponId: "cp1",
    subtotal: 20000,
    discount: 2000,
    total: 18000,
    paymentMethod: Paymethod.EXPRESS,
    paidAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),

    customer: {
      id: "u2",
      firstName: "Ana",
      lastName: "Costa",
      email: "ana@gmail.com",
    } as any,

    deliveryman: {
      id: "u4",
      firstName: "Pedro",
      lastName: "Gomes",
      email: "pedro@gmail.com",
    } as any,

    address: {
      street: "Rua das Flores",
      city: "Benguela",
    } as any,

    cart: {
      items: [{ id: "p3", quantity: 3 }],
    } as any,

    coupon: {
      code: "DESC10",
      discount: 2000,
    } as any,
  },

  {
    id: "ORD-003",
    customerId: "u1",
    deliveryManId: "u3",
    status: OrderStatus.PROCESSING,
    cartId: "c3",
    couponId: undefined,
    subtotal: 8000,
    discount: 0,
    total: 8000,
    paymentMethod: Paymethod.CASH,
    paidAt: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),

    customer: {
      id: "u1",
      firstName: "João",
      lastName: "Silva",
      email: "joao@gmail.com",
    } as any,

    deliveryman: {
      id: "u3",
      firstName: "Carlos",
      lastName: "Mendes",
      email: "delivery@gmail.com",
    } as any,

    address: {
      street: "Rua 5",
      city: "Huambo",
    } as any,

    cart: {
      items: [{ id: "p4", quantity: 1 }],
    } as any,

    coupon: undefined,
  },

  {
    id: "ORD-004",
    customerId: "u5",
    deliveryManId: "u3",
    status: OrderStatus.CANCELLED,
    cartId: "c4",
    couponId: undefined,
    subtotal: 15000,
    discount: 0,
    total: 15000,
    paymentMethod: Paymethod.CASH,
    paidAt: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),

    customer: {
      id: "u5",
      firstName: "Marta",
      lastName: "Dias",
      email: "marta@gmail.com",
    } as any,

    deliveryman: {
      id: "u3",
      firstName: "Carlos",
      lastName: "Mendes",
      email: "delivery@gmail.com",
    } as any,

    address: {
      street: "Rua Central",
      city: "Lubango",
    } as any,

    cart: {
      items: [{ id: "p2", quantity: 1 }],
    } as any,

    coupon: undefined,
  },

  {
    id: "ORD-005",
    customerId: "u6",
    deliveryManId: "u4",
    status: OrderStatus.REFUNDED,
    cartId: "c5",
    couponId: undefined,
    subtotal: 10000,
    discount: 0,
    total: 10000,
    paymentMethod: Paymethod.EXPRESS,
    paidAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),

    customer: {
      id: "u6",
      firstName: "Luis",
      lastName: "Pereira",
      email: "luis@gmail.com",
    } as any,

    deliveryman: {
      id: "u4",
      firstName: "Pedro",
      lastName: "Gomes",
      email: "pedro@gmail.com",
    } as any,

    address: {
      street: "Rua Nova",
      city: "Malanje",
    } as any,

    cart: {
      items: [{ id: "p1", quantity: 2 }],
    } as any,

    coupon: undefined,
  },
];
