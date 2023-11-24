 
import { Controller, Get , Body , Post } from '@nestjs/common';
import { PhotoService } from '../Service/PhotoService';
import { Photo } from 'src/Entity/Photo';

@Controller('photo')
export class PhotoController {
    constructor(private service: PhotoService) { }

  @Get()
  findAll(){
    return this.service.findAll();
  }
  @Post()
    create(@Body() photo: Photo) {
        return this.service.Create(photo);
    }
}