import AuthProvider from '../../../domains/entities/AuthProvider';
import { IAuthReturnType, IAuthStrategie } from '../../../domains/interface';
import AuthRepository from '../../../domains/repositories/abstraction';
import PasswordHasher from '../../../domains/services/encript';
import JwtService from '../../../domains/services/jwt';
import { LoginDto } from '../../dto/login.dto';
import {
  InvalidCredentialsException,
  UserInactiveException,
  UserNotFoundException,
} from '../../shared/error';

export default class AppAuth implements IAuthStrategie<LoginDto> {
  constructor(private readonly repo: AuthRepository) {}

  public async login(data: LoginDto): Promise<IAuthReturnType> {
    if (!data || !data.password || data.email) {
      throw new InvalidCredentialsException();
    }
    const user = await this.repo.getByEmail(data.email!);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (!user.isActive) {
      throw new UserInactiveException();
    }
    if (user.authProvider !== AuthProvider.APP) {
      throw new InvalidCredentialsException();
    }
    const isPasswordMatch = await PasswordHasher.compare(
      data.password,
      user.password!,
    );
    if (!isPasswordMatch) {
      throw new InvalidCredentialsException();
    }
    const token = JwtService.sign({
      sub: user.id,
      role: user.role,
    });
    return {
      entitie: user,
      token,
    };
  }
}
