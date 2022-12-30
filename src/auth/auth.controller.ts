import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return await this.authservice.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return await this.authservice.signin(body);
  }
}
