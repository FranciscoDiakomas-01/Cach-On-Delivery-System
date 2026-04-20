import { Module } from '@nestjs/common';
import { UserEventsSubscriberService } from '../../application/events/subscribe';
import AuthModule from 'src/modules/Auth/presentation/http/module';
import { UserController } from './controller';
import { CreateDeliveryManUseCase } from '../../application/use-cases/createDeliveryManUseCase';
import { UpdateProfileUseCase } from '../../application/use-cases/updateUserUseCase';
import { ToggleActiveUserUseCase } from '../../application/use-cases/toogleUserUseCase';
import {
  GetUserByUniqueIdUseCase,
  GetUsersUseCase,
} from '../../application/use-cases/getUsersUseCase';
import { UpdateCredentialsUseCase } from '../../application/use-cases/updateCredentialsUsecase';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    UserEventsSubscriberService,
    CreateDeliveryManUseCase,
    UpdateProfileUseCase,
    ToggleActiveUserUseCase,
    GetUsersUseCase,
    GetUserByUniqueIdUseCase,
    UpdateCredentialsUseCase,
  ],
  exports: [
    UserEventsSubscriberService,
    CreateDeliveryManUseCase,
    UpdateProfileUseCase,
    ToggleActiveUserUseCase,
    GetUsersUseCase,
    GetUserByUniqueIdUseCase,
    UpdateCredentialsUseCase,
  ],
})
export class UserModule {}
