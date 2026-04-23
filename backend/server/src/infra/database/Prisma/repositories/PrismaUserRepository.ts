/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable } from '@nestjs/common';
import UserRepository from 'src/modules/User/domains/repositories/abstraction';
import { PrismaService } from '../prisma';
import { IPagination, IPagintionProps } from 'src/core/types';
import { IUser } from 'src/modules/User/domains/entities/User';
import { IPosition } from 'src/modules/User/domains/interface';

@Injectable()
export default class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(props: IPagintionProps): Promise<IPagination<IUser>> {
    const { page = 1, limit = 10 } = props;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: {
          isActive: true,
        },
      }),
      this.prisma.user.count(),
    ]);
    return {
      items: data as IUser[],
      total,
      page,
      limit,
      hasNexPage: skip + data.length < total,
      hasPrevPage: page > 1,
    };
  }

  async getByUniqueId(uniqueId: string): Promise<IUser | null> {
    return (await this.prisma.user.findFirst({
      where: { OR: [{ email: uniqueId }, { id: uniqueId }] },
    })) as IUser | null;
  }

  async updateProfile(userId: string, data: Partial<IUser>): Promise<IUser> {
    return (await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    })) as IUser;
  }

  async toogleActive(userId: string, isActive: boolean): Promise<IUser> {
    return (await this.prisma.user.update({
      where: { id: userId },
      data: { isActive },
    })) as IUser;
  }

  async createDeliveryMan(data: IUser): Promise<IUser> {
    const user = await this.prisma.user.create({
      data: {
        role: 'DELIVERY',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return user as IUser;
  }

  async updatePosition(userId: string, position: IPosition): Promise<IUser> {
    return (await this.prisma.user.update({
      where: { id: userId },
      data: {
        curentLat: position.lat,
        currentLog: position.log,
      },
    })) as IUser;
  }

  async updatePassword(userId: string, password: string): Promise<IUser> {
    return (await this.prisma.user.update({
      where: { id: userId },
      data: {
        password,
      },
    })) as IUser;
  }

  public async getDeliveriesMan(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'DELIVERY',
        isActive: true,
      },
      include: {
        deliveryOrders: {
          where: {
            status: {
              in: ['PROCESSING', 'PENDING'],
            },
          },
        },
      },
    });
    return users as any as IUser[];
  }
}
