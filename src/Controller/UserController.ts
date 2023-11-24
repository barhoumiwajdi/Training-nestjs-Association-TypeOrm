 
import { Controller, Get , Body , Post } from '@nestjs/common';
import { UserService } from '../Service/UserService';
import { User } from '../Entity/User';

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
}