import { Injectable, Inject ,UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Entity/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private UserRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.UserRepository.findOne({
        where : {email}
    });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
return {
  access_token: await this.jwtService.signAsync(payload),
};}
  async findAll(): Promise<User[]> {
    return this.UserRepository.find({relations: {
        photos: true,
    },});
  }
  async Create(User :User):Promise<User>{
    return this.UserRepository.save(User)
  }
  async findone(email : string) : Promise<User | undefined> {
return this.UserRepository.findOne({
    where: { email },
  });
  }
}