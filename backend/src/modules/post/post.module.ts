import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [MongodbService, PrismaService, PostService],
})
export class PostModule {}
