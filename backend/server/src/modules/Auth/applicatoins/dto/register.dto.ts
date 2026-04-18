import AuthProvider from '../../domains/entities/AuthProvider';

export default class RegisterDto {
  provider!: AuthProvider;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
}
