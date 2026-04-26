/* eslint-disable @typescript-eslint/no-explicit-any */
import Review from "@/types/Review";
import { ordersMock } from "./ordersMock";

export const reviewsMock: Review[] = [
  {
    id: "r1",
    userId: "u1",
    orderId: "ORD-002",
    rating: 5,
    content: "Entrega rápida e produto em perfeito estado.",
    createdAt: new Date(),

    user: {
      id: "u1",
      firstName: "João",
      lastName: "Silva",
      email: "joao@gmail.com",
    } as any,

    order: ordersMock[1],
  },

  {
    id: "r2",
    userId: "u2",
    orderId: "ORD-002",
    rating: 4,
    content: "Bom produto, mas a embalagem podia ser melhor.",
    createdAt: new Date(),

    user: {
      id: "u2",
      firstName: "Ana",
      lastName: "Costa",
      email: "ana@gmail.com",
    } as any,

    order: ordersMock[1],
  },

  {
    id: "r3",
    userId: "u5",
    orderId: "ORD-004",
    rating: 2,
    content: "Pedido cancelado sem explicação clara.",
    createdAt: new Date(),

    user: {
      id: "u5",
      firstName: "Marta",
      lastName: "Dias",
      email: "marta@gmail.com",
    } as any,

    order: ordersMock[3],
  },

  {
    id: "r4",
    userId: "u6",
    orderId: "ORD-005",
    rating: 3,
    content: "Recebi o reembolso, mas demorou bastante.",
    createdAt: new Date(),

    user: {
      id: "u6",
      firstName: "Luis",
      lastName: "Pereira",
      email: "luis@gmail.com",
    } as any,

    order: ordersMock[4],
  },

  {
    id: "r5",
    userId: "u1",
    orderId: "ORD-003",
    rating: 5,
    content: "Tudo perfeito, recomendo!",
    createdAt: new Date(),

    user: {
      id: "u1",
      firstName: "João",
      lastName: "Silva",
      email: "joao@gmail.com",
    } as any,

    order: ordersMock[2],
  },
];
