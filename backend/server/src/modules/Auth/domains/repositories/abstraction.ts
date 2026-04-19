import User from 'src/modules/User/domains/entities/User';
import { IUser } from 'src/modules/User/domains/interface';

export default abstract class AuthRepository {
  abstract getByEmail(email: string): Promise<IUser | null>;
  abstract getById(id: string): Promise<IUser | null>;
  abstract register(user: User): Promise<IUser>;
  abstract createRecoveryToken(data: {
    userId: string;
    token: string;
    expiresAt: Date;
  }): Promise<void>;
  abstract getRecoveryToken(token: string): Promise<{
    userId: string;
    expiresAt: Date;
    isUsed: boolean;
    user: IUser;
  } | null>;
  abstract markRecoveryTokenAsUsed(userId: string): Promise<void>;
  abstract updatePassword(userId: string, password: string): Promise<void>;
}
