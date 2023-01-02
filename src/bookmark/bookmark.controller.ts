import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { BookMarkDto, BookMarkDtoUpdate } from './dtos/BookMark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarksService: BookmarkService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createBookMark(
    @GetUser('id') userId: string,
    @Body() bookmark: BookMarkDto,
  ) {
    return await this.bookmarksService.create(userId, bookmark);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getBookMarks(@GetUser('id') userId: string) {
    return await this.bookmarksService.get(userId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getBookMarkById(
    @GetUser('id') userId: string,
    @Param('id') bookMarkId: string,
  ) {
    return await this.bookmarksService.getOne(userId, bookMarkId);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateBookMark(
    @GetUser('id') userId: string,
    @Param('id') bookMarkId: string,
    @Body() data: BookMarkDtoUpdate,
  ) {
    return await this.bookmarksService.update(userId, bookMarkId, data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteBookMark(
    @GetUser('id') userId: string,
    @Param('id') bookMarkId: string,
  ) {
    return await this.bookmarksService.delete(userId, bookMarkId);
  }
}
