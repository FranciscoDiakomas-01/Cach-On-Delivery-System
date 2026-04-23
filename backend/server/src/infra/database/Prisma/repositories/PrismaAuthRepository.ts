/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import AuthRepository from 'src/modules/Auth/domains/repositories/abstraction';
import { PrismaService } from '../prisma';
import { IUser } from 'src/modules/User/domains/entities/User';

@Injectable()
export default class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, isActive: true },
    });
    if (!user) return null;
    return user as IUser;
  }
  async getById(id: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, isActive: true },
    });

    if (!user) return null;

    return user as IUser;
  }

  async register(user: IUser): Promise<IUser> {
    const created = await this.prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
        authProvider: user.authProvider,
        isActive: user.isActive,
      },
    });
    return created as IUser;
  }
  async updatePassword(userId: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId, isActive: true },
      data: {
        password,
      },
    });
  }

  async createRecoveryToken(data: {
    userId: string;
    token: string;
    expiresAt: Date;
  }): Promise<void> {
    await this.prisma.recovery.create({
      data: {
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiresAt,
        isUsed: false,
      },
    });
  }

  async getRecoveryToken(token: string): Promise<{
    userId: string;
    expiresAt: Date;
    isUsed: boolean;
    user: IUser;
  } | null> {
    const recovery = await this.prisma.recovery.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });

    if (!recovery) return null;

    return {
      userId: recovery.userId,
      expiresAt: recovery.expiresAt,
      isUsed: recovery.isUsed,
      user: recovery.user as IUser,
    };
  }

  async markRecoveryTokenAsUsed(userId: string): Promise<void> {
    await this.prisma.recovery.updateMany({
      where: { userId },
      data: {
        isUsed: true,
      },
    });
  }
}
