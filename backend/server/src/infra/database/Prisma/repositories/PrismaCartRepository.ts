/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable } from '@nestjs/common';
import Cart from 'src/modules/Cart/domains/entities/Cart';
import CartRepository from 'src/modules/Cart/domains/repositories/abstraction';
import { PrismaService } from '../prisma';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createCart(userId: string): Promise<Cart> {
    const data = await this.prisma.cart.create({
      data: {
        userId,
        isActive: true,
      },
      include: {
        items: true,
      },
    });
    return data as Cart;
  }
  async getCartByUserId(userId: string): Promise<Cart | null> {
    const data = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
          },
        },
        order: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    return data as Cart | null;
  }
  async deleteCart(cartId: string): Promise<void> {
    await this.prisma.cart.delete({
      where: { id: cartId },
    });
  }
  async addItemToCart(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    await this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }
  async removeItemFromCart(cartId: string, productId: string): Promise<void> {
    await this.prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
  }
  async updateItemQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    await this.prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
      data: {
        quantity,
      },
    });
  }
  async clearCart(cartId: string): Promise<void> {
    await this.prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }
  async markCartAsInactive(id: string): Promise<void> {
    await this.prisma.cart.updateMany({
      where: {
        OR: [
          {
            userId: id,
          },
          {
            id,
          },
        ],
      },
      data: { isActive: false },
    });
  }

  async reserveStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        available: {
          decrement: qty,
        },
        reserved: {
          increment: qty,
        },
      },
    });
  }
  async decreaseStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        reserved: {
          decrement: qty,
        },
        // available NÃO volta
        // porque já saiu do sistema
      },
    });
  }

  async releaseStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        reserved: {
          decrement: qty,
        },
        available: {
          increment: qty,
        },
      },
    });
  }

  async getById(id: string): Promise<Cart | null> {
    const data = await this.prisma.cart.findFirst({
      where: { id },
      include: {
        order: true,
        items: true,
      },
    });

    return data as Cart | null;
  }
}
