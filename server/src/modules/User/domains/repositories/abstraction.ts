import { IPagination, IPagintionProps } from 'src/core/types';
import { IPosition } from '../interface';
import { IUser } from '../entities/User';

export default abstract class UserRepository {
  public abstract get(props: IPagintionProps): Promise<IPagination<IUser>>;
  public abstract getByUniqueId(uniqueId: string): Promise<IUser | null>;
  public abstract updateProfile(userId: string, data: any): Promise<IUser>;
  abstract getDeliveriesMan(): Promise<IUser[]>;
  public abstract toogleActive(
    userId: string,
    isActive: boolean,
  ): Promise<IUser>;
  public abstract createDeliveryMan(data: IUser): Promise<IUser>;
  public abstract updatePosition(
    userId: string,
    position: IPosition,
  ): Promise<IUser>;
  public abstract updatePassword(
    userId: string,
    password: string,
  ): Promise<IUser>;
}
