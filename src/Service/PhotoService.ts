import { Injectable, Inject, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from '../Entity/Photo';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) { }

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find({
      relations: {
        user: true,
      },
    });
  }
  async Create(photo: Photo): Promise<Photo> {
    return this.photoRepository.save(photo)
  }
  async finduserPhoto(id: number): Promise<Photo[]> {
    try {
      const photos = await this.photoRepository.find({
        relations: ['user'],
        where: {
          user: {
            id: id
          }
        }
      })
      console.log(photos)
      if (photos.length != 0) {
        return photos
      }
      else {
        throw new BadRequestException('Images Not found',
          {
            cause: new Error(),
            description: 'Some error description'
          })
      }

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'This is a custom message Internal Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }

  }

}