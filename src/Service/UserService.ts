import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../Entity/User';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private UserRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserRepository.find({relations: {
        photos: true,
    },});
  }
  async Create(User :User):Promise<User>{
    return this.UserRepository.save(User)
  }
}