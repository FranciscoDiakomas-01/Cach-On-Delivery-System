import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import Cart from 'src/modules/Cart/domains/entities/Cart';
import CartRepository from 'src/modules/Cart/domains/repositories/abstraction';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async createCart(userId: string): Promise<Cart> {
    return (await this.prisma.cart.create({
      data: {
        userId,
        isActive: true,
      },
      include: {
        items: true,
      },
    })) as unknown as Cart;
  }
  async getCartByUserId(userId: string): Promise<Cart | null> {
    return (await this.prisma.cart.findFirst({
      where: { userId, isActive: true },
      include: {
        items: true,
      },
    })) as unknown as Cart | null;
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
  async markCartAsInactive(userId: string): Promise<void> {
    await this.prisma.cart.updateMany({
      where: { userId, isActive: true },
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

  async releaseStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          increment: qty,
        },
        reserved: {
          decrement: qty,
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
      },
    });
  }
}
