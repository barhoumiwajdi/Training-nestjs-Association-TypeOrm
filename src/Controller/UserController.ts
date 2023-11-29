
import { Controller, Get, HttpCode, Param, Body, HttpStatus, Post, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from '../Service/UserService';
import { User } from '../Entity/User';
import { AuthGuard } from '../Guard/AuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Post()
  create(@Body() user: User) {
    return this.service.signup(user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
  @Get('search/:name')
  async findOnebyname(@Param('name') name: string) {
    return this.service.finByName(name);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.service.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
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
    return {
      statusCode: 200,
      data: file.path,
    };
  }
}