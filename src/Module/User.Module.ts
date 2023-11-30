import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from '../Provider/User';
import { UserService } from '../Service/UserService';
import { UserController } from '../Controller/UserController';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { PhotoService } from 'src/Service/PhotoService';
@Module({
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  }),],
  providers: [
    ...UserProviders,
    UserService,

  ],
  controllers: [UserController],

})
export class UserModule { }