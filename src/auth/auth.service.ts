import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prismaService/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
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

    return await this.signToken(user.id, user.email);
  }

  private async signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
