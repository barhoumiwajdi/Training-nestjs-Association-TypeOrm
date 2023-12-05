import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';


import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/Service/UserService';
import { TokenProvider } from 'src/Provider/Token';


@Module({
    imports: [DatabaseModule, JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
    }),],
    providers: [
        ...TokenProvider,



    ],
    controllers: [],

})
export class TokenModule { }