import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return await this.authservice.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return await this.authservice.signin(body);
  }
}
