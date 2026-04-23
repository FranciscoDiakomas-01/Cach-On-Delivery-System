import { Global, Module } from '@nestjs/common';
import { NODEMAILER_SERVICE } from 'src/core/constants';
import { NodeMailerService } from './providers/Nodemailer';

@Module({
  exports: [NODEMAILER_SERVICE],
  providers: [
    {
      provide: NODEMAILER_SERVICE,
      useClass: NodeMailerService,
    },
  ],
})
@Global()
export default class EmailModule {}
