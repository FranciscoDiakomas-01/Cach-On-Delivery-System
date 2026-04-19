import { Injectable } from '@nestjs/common';
import AuthRepository from 'src/modules/Auth/domains/repositories/abstraction';
import User from 'src/modules/User/domains/entities/User';
import { IUser } from 'src/modules/User/domains/interface';
import { PrismaService } from '../prisma';

@Injectable()
export default class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return user as IUser;
  }
  async getById(id: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return user as IUser;
  }

  async register(user: User): Promise<IUser> {
    const data = user.toJSON();

    const created = await this.prisma.user.create({
      data: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: data.role,
        authProvider: data.authProvider,
        isActive: data.isActive,
        curentLat: data.curentLat,
        currentLog: data.currentLog,
        maxLoad: data.maxLoad,
      },
    });
    return created as IUser;
  }
  async updatePassword(userId: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
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
