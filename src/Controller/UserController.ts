
import { Controller, Get, HttpCode, Param, Body, HttpStatus, Post, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from '../Service/UserService';
import { User } from '../Entity/User';
import { AuthGuard } from '../Guard/AuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UserDto } from "../Dto/User-Dto"
import { PhotoService } from 'src/Service/PhotoService';
import { Tokendto } from 'src/Dto/Token-Dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  @Post('register')
  async create(@Body() SaveData: UserDto, @UploadedFile() file: Express.Multer.File, @Request() req) {

    const user = JSON.parse(JSON.stringify(req.body));

    user.Image = file.path
    SaveData = {
      name: user.name,
      email: user.email,
      password: user.password,
      Image: user.Image
    }

    return this.service.signup(SaveData);
  }
  @HttpCode(HttpStatus.OK)
  @Get('serachbyid/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('searchbyname/:name')
  async findOnebyname(@Param('name') name: string) {
    return this.service.finByName(name);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() user: User, token: Tokendto) {
    console.log(user)
    return this.service.signIn(user, token);
  }


  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('delete/:id')
  async DeleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteUser(id);
  }


  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('local')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async local(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return {
      statusCode: 200,
      data: file.path,
    };
  }


}