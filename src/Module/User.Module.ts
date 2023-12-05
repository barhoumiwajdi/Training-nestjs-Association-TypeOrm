import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from '../Provider/User';
import { UserService } from '../Service/UserService';
import { UserController } from '../Controller/UserController';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

import { TokenProvider } from 'src/Provider/Token';
import { TokenModule } from './Token.Module';
@Module({
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  }), /*TokenModule*/],
  providers: [
    ...UserProviders,
    UserService,
    // ...TokenProvider


  ],
  controllers: [UserController],

})
export class UserModule { }