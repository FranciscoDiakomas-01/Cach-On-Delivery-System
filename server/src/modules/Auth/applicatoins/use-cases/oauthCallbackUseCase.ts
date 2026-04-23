/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUseCase } from 'src/core/types';
import { OAuthProviderDto } from '../dto/oauth.dto';
import { IAuthReturnType } from '../../domains/interface';
import OAuthFactory from '../OAuth/factory/oauth.factory';
import AuthRepository from '../../domains/repositories/abstraction';
import { AUTH_REPOSITORY } from 'src/core/constants';
import { BadRequestException, Inject } from '@nestjs/common';
import JwtService from '../../domains/services/jwt';
import { UserInactiveException, UserNotFoundException } from '../shared/error';
import AuthProvider from '../../domains/entities/AuthProvider';
import UserRole from 'src/modules/User/domains/entities/UserRole';

export default class OauthCallbackUseCase implements IUseCase<
  OAuthProviderDto,
  IAuthReturnType
> {
  constructor(
    private readonly OAuthFactory: OAuthFactory,
    @Inject(AUTH_REPOSITORY) private readonly repo: AuthRepository,
    private readonly JwtService: JwtService,
  ) {}

  public async handle(dto: OAuthProviderDto): Promise<IAuthReturnType> {
    const { code, provider } = dto;
    const strategy = this.OAuthFactory.create(provider);
    const oauthUser = await strategy.login(code);
    if (!strategy) {
      throw new BadRequestException({
        messsage: 'OAuth provider não implementado',
      });
    }
    if (!oauthUser) {
      throw new UserNotFoundException();
    }
    const { email, name } = oauthUser;
    const user = await this.repo.getByEmail(email);
    const oauthProvider = provider.toUpperCase() as AuthProvider;
    if (!user) {
      const created = await this.repo.register({
        authProvider: oauthProvider,
        createdAt: new Date(),
        email,
        isActive: true,
        id: crypto.randomUUID(),
        firstName: name?.split(' ')[0] ?? '',
        lastName: name?.split(' ')[1] ?? '',
        role: UserRole.CUSTOMER,
        updatedAt: new Date(),
        cart: [],
        customerOrders: [],
        deliveryOrders: [],
        events: [],
        notifications: undefined,
        password: '',
        reviews: [],
      });
      const token = this.JwtService.sign({
        sub: created.id,
        role: created.role,
      });
      const { password, ...publicUser } = created;
      return {
        entitie: publicUser,
        token,
      };
    }
    if (!user.isActive) {
      throw new UserInactiveException();
    }
    const token = this.JwtService.sign({
      sub: user.id,
      role: user.role,
    });
    const { password, ...publicUser } = user;
    return {
      entitie: publicUser,
      token,
    };
  }
}
