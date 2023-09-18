import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PostController],
  providers: [MongodbService, PrismaService],
})
export class PostModule {}
