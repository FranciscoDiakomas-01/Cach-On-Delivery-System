import { IUser } from 'src/modules/User/domains/entities/User';

export interface IAuthReturnType {
  entitie: IUser;
  token: string;
  message?: string;
}

export interface IAuthStrategie<Payload> {
  login(data: Payload): Promise<IAuthReturnType>;
}
