import { Injectable, Inject, UnauthorizedException, BadRequestException, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Entity/User';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'
import * as bcrypt from 'bcrypt';




@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')
    private UserRepository: Repository<User>,
    private jwtService: JwtService,


  ) { }
  async signup(user: User): Promise<any> {
    try {
      const email = user.email
      const found = await this.UserRepository.createQueryBuilder()
        .where('email = :email', { email })
        .getOne();
      if (found) {
        return new BadRequestException('User Already Exist', { cause: new Error(), description: 'Some error description' })
      }
      else {
        const saltOrRounds = 10;

        user.password = await bcrypt.hash(user.password, saltOrRounds);

        return this.UserRepository.save(user)

      }
    } catch (error) {
      console.log(error)
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
      if (user) {
        const isMatch = await bcrypt.compare(pass, user?.password);
        if (!isMatch) {
          throw new BadRequestException('User verify email and password', { cause: new Error(), description: 'Some error description' })

        }
        if (user.Status == true) {
          const payload = { sub: user.id, username: user.email };
          return {
            access_token: await this.jwtService.signAsync(payload),
          }
        }
        else {
          throw new UnauthorizedException("Account has beeen désactivated")
        }

      }
      else {
        throw new BadRequestException('Vérifier email and password',
          {
            cause: new Error(),
            description: 'Some error description'
          })
      }
      ;
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

  async finByName(name: any) {
    try {
      const data = await this.UserRepository.findOne({
        where: { name: name }
      })
      if (data) {
        return data
      }
      else {
        throw new BadRequestException('User Not found',
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
  async findById(id: number) {
    try {
      const data = await this.UserRepository.findOne({
        where: { id: id }
      })
      if (data) {
        return data
      }
      else {
        throw new BadRequestException('User Not found',
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
  async deleteUser(id: any) {
    try {
      const state = false
      await this.UserRepository
        .createQueryBuilder()
        .update(User)
        .set({ Status: state })
        .where({ id: id })
        .execute();
      throw new HttpException({
        status: HttpStatus.ACCEPTED,
        error: "user banned"
      },
        HttpStatus.ACCEPTED)

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: " this internal Serveur "
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }
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
  async upload(@UploadedFile() file) {
    console.log(file)
  }

}