/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUseCase } from 'src/core/types';
import RegisterDto from '../dto/register.dto';
import { IAuthReturnType } from '../../domains/interface';
import PasswordHasher from '../../domains/services/encript';
import JwtService from '../../domains/services/jwt';
import AuthRepository from '../../domains/repositories/abstraction';
import { AUTH_REPOSITORY } from 'src/core/constants';
import { Inject } from '@nestjs/common';
import { EmailAlreadyInUseException } from '../shared/error';
import AuthProvider from '../../domains/entities/AuthProvider';
import UserRole from 'src/modules/User/domains/entities/UserRole';

export default class RegisterUseCase implements IUseCase<
  RegisterDto,
  IAuthReturnType
> {
  constructor(
    private readonly PasswordHasher: PasswordHasher,
    private readonly JwtService: JwtService,
    @Inject(AUTH_REPOSITORY) private readonly repo: AuthRepository,
  ) {}

  public async handle(data: RegisterDto): Promise<IAuthReturnType> {
    const { email, firstName, lastName, password } = data;
    const user = await this.repo.getByEmail(email);
    if (user) {
      throw new EmailAlreadyInUseException();
    }
    const hashPassword = await this.PasswordHasher.hash(password);
    const created = await this.repo.register({
      authProvider: AuthProvider.APP,
      createdAt: new Date(),
      email,
      isActive: true,
      id: crypto.randomUUID(),
      firstName,
      lastName,
      role: UserRole.CUSTOMER,
      updatedAt: new Date(),
      password: hashPassword,
      cart: [],
      customerOrders: [],
      deliveryOrders: [],
      events: [],
      notifications: undefined,
    });
    const token = this.JwtService.sign({
      sub: created.id,
      role: created.role,
    });
    const { password: _, ...publicUser } = created;
    return {
      entitie: publicUser,
      token,
    };
  }
}
