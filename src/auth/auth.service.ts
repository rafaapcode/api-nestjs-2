import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prismaService/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signup(body: SignUpDto) {
    try {
      const { email, firstName, password, lastName } = body;
      const hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          hash,
        },
      });
      console.log(user);
      Reflect.deleteProperty(user, 'hash');
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'Email user already exists',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signin(body: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      throw new HttpException('User not exists', HttpStatus.NOT_FOUND);
    }

    const correctPass = await argon.verify(user.hash, body.password);

    if (!correctPass) {
      throw new HttpException('Password Incorrect', HttpStatus.UNAUTHORIZED);
    }
    Reflect.deleteProperty(user, 'hash');
    return user;
  }
}
