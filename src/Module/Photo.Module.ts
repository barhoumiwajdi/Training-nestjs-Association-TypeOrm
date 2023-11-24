import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { photoProviders } from '../Provider/Photo';
import { PhotoService } from '../Service/PhotoService';
import { PhotoController } from '../Controller/PhotoController';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...photoProviders,
    PhotoService,
  ],
  controllers: [PhotoController],

})
export class PhotoModule {}