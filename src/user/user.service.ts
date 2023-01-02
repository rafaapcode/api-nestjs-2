import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prismaService/prisma.service';
import { UserEditDto } from './dtos/user-edit.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async editUser(id: string, data: UserEditDto): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id },
      data: data,
    });
    return { message: 'User updated successfully' };
  }
}
