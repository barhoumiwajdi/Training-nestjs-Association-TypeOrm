
import { Controller, Get, Body, Post, Param, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { PhotoService } from '../Service/PhotoService';
import { Photo } from 'src/Entity/Photo';

@Controller('photo')
export class PhotoController {
  constructor(private service: PhotoService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Post()
  create(@Body() photo: Photo) {
    return this.service.Create(photo);
  }


  @Get('imagesPerUser/:id')
  async findphoto(@Param('id', ParseIntPipe) id: number) {
    return this.service.finduserPhoto(id);
  }
}