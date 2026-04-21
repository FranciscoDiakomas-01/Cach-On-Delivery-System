import { Injectable } from '@nestjs/common';
import Cart from 'src/modules/Cart/domains/entities/Cart';
import CartRepository from 'src/modules/Cart/domains/repositories/abstraction';
import { PrismaService } from '../prisma';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaService) {}
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
        order: true,
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
      where: {
        id: productId,
        available: {
          gte: qty,
        },
      },
      data: {
        reserved: {
          increment: qty,
        },
        available: {
          decrement: qty,
        },
      },
    });
  }
  async decreaseStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: {
        id: productId,
        available: {
          gte: qty,
        },
      },
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

  async releaseStock(productId: string, qty: number): Promise<void> {
    await this.prisma.product.update({
      where: {
        id: productId,
      },
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
}
