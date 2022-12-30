import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma/prismaService/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    AuthModule,
    UserModule,
    BookmarkModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
