
import { Controller, Get, HttpCode, Body, HttpStatus, Post, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from '../Service/UserService';
import { User } from '../Entity/User';
import { AuthGuard } from '../Guard/AuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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