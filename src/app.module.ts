import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PhotoModule } from './Module/Photo.Module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './Module/User.Module';
 
 

@Module({
  imports: [PhotoModule , DatabaseModule , UserModule],
  controllers: [AppController  ],
  providers: [AppService ],
})
export class AppModule {}