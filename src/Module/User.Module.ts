import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from '../Provider/User';
import { UserService } from '../Service/UserService';
import { UserController } from '../Controller/UserController';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...UserProviders,
    UserService,
  ],
  controllers: [UserController],

})
export class UserModule {}