import { Injectable, Inject, UnauthorizedException, BadRequestException, HttpException, HttpStatus ,UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Entity/User';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { ExampleService } from './Email.Service';


@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private UserRepository: Repository<User>,
    private jwtService: JwtService ,
    private EmailService : ExampleService
  ) { }
  async signup(user: User): Promise<any> {
    try {
      const email = user.email
      const found = await this.UserRepository.findOne({
        where: { email: email }
      })
      if (found) {
        throw new BadRequestException('User Already Exist', { cause: new Error(), description: 'Some error description' })
      }
      else {
        await this.EmailService.example(user.email)
        return this.UserRepository.save(user)
      
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
  async signIn(email: string, pass: string): Promise<any> {
    try {
      const user = await this.UserRepository.findOne({
        where: { email }
      });
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),

      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'This is a custom message Internal Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }
  async findAll(): Promise<User[]> {
    return this.UserRepository.find({
      relations: {
        photos: true,
      },
    });
  }

  async findone(email: string): Promise<User | undefined> {
    return this.UserRepository.findOne({
      where: { email: email },
    });
  }

  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async upload( @UploadedFile() file) {
    console.log(file)
  }
  
}