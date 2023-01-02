import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prismaService/prisma.service';
import { BookMarkDto, BookMarkDtoUpdate } from './dtos/BookMark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, bookmark: BookMarkDto) {
    const data = {
      ...bookmark,
      userId: id,
    };

    return this.prisma.bookmark.create({
      data,
    });
  }

  async get(userId: string) {
    return this.prisma.bookmark.findMany({
      where: { userId },
    });
  }

  async getOne(userId: string, bookMarkId: string) {
    return this.prisma.bookmark.findMany({
      where: { AND: [{ userId }, { id: bookMarkId }] },
    });
  }

  async update(userId: string, bookMarkId: string, data: BookMarkDtoUpdate) {
    if (!(await this.getOne(userId, bookMarkId))) {
      throw new NotFoundException('Bookmark not found');
    }

    return await this.prisma.bookmark.update({
      where: { id: bookMarkId },
      data,
    });
  }

  async delete(userId: string, bookMarkId: string) {
    if (!(await this.getOne(userId, bookMarkId))) {
      throw new NotFoundException('Bookmark not found');
    }
    await this.prisma.bookmark.delete({
      where: { id: bookMarkId },
    });
    return {
      message: 'Bookmark deleted.',
    };
  }
}
