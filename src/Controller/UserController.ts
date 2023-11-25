 
import { Controller, Get ,HttpCode, Body ,HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../Service/UserService';
import { User } from '../Entity/User';
import { AuthGuard } from '../Guard/AuthGuard';
@Controller('User')
export class UserController {
    constructor(private service: UserService) { }

  @Get()
  findAll(){
    return this.service.findAll();
  }
  @Post()
    create(@Body() user: User) {
        return this.service.Create(user);
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
}