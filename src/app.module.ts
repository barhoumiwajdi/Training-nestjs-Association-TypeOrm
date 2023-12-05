import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PhotoModule } from './Module/Photo.Module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './Module/User.Module';
import { MailerModule } from '@nestjs-modules/mailer';


import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { TokenModule } from './Module/Token.Module';

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: 'localhost',
      port: 1025,
      ignoreTLS: true,
      secure: false,
      auth: {
        user: process.env.MAILDEV_INCOMING_USER,
        pass: process.env.MAILDEV_INCOMING_PASS,
      },
    },
    defaults: {
      from: '"No Reply" <no-reply@localhost>',
    },
    preview: true,
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  }), PhotoModule, DatabaseModule, UserModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }