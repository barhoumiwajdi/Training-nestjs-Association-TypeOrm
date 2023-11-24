import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from '../Entity/Photo';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find({relations: {
        user: true,
    },});
  }
  async Create(photo :Photo):Promise<Photo>{
    return this.photoRepository.save(photo)
  }
}