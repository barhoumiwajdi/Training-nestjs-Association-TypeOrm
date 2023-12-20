import { Injectable, Inject, UnauthorizedException, BadRequestException, HttpException, HttpStatus, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Entity/User';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/Dto/User-Dto';



@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')

    private UserRepository: Repository<User>,

    private jwtService: JwtService,


  ) { }
  async signup(user: UserDto): Promise<any> {
    try {
      const email = user.email
      const found = await this.UserRepository.createQueryBuilder()
        .where('email = :email', { email })
        .getOne()
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
      return new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'This is a custom message Internal Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }

  }
  async signIn(user: User): Promise<any> {
    console.log(user)


    console.log("this data is comming from front end ", user)
    const data = await this.UserRepository.findOne({
      where:
        { email: user.email }

    });
    console.log("this is object log", data)
    if (user) {

      const isMatch = await bcrypt.compare(user.password, data.password);
      console.log(isMatch)
      if (!isMatch) {
        throw new BadRequestException('User verify email and password', { cause: new Error(), description: 'Some error description' })
      }
      else if ((data.Status == true) && isMatch) {
        const payload = { sub: data.id, username: data.email };

        const access_token = await this.jwtService.signAsync(payload)

        return {
          access_token,
          data
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
  }
  async findAll(): Promise<User[]> {
    return this.UserRepository.find({
      relations: {
        photos: true

      },
    });
  }

  async finByName(name: any) {
    try {
      const data = await this.UserRepository.findOne({
        where: { lastname: name }
      })
      if (data) {
        return data
      }
      else {
        return new BadRequestException('User Not found',
          {
            cause: new Error(),
            description: 'Some error description'
          })
      }

    } catch (error) {
      return new HttpException({
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
        return new BadRequestException('User Not found',
          {
            cause: new Error(),
            description: 'Some error description'
          })
      }

    } catch (error) {
      return new HttpException({
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
      return "user banned"

    } catch (error) {
      return new HttpException({
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
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async upload(@UploadedFile() file) {
    console.log(file)
  }
}

