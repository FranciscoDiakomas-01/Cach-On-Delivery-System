import AuthProvider from 'src/modules/Auth/domains/entities/AuthProvider';
import UserRole from '../entities/UserRole';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string | null;
  role: UserRole;
  authProvider: AuthProvider;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  curentLat: number;
  currentLog: number;
  maxLoad: number;
}
