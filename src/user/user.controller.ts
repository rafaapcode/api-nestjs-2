import { Controller, Get, Put, UseGuards, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserEditDto } from './dtos/user-edit.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return { user };
  }

  @UseGuards(JwtGuard)
  @Put('edit')
  editUser(@GetUser('id') userId: string, @Body() data: UserEditDto) {
    return this.userservice.editUser(userId, data);
  }
}
