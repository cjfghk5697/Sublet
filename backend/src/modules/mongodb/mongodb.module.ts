import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbPostService } from './mongodb.post.service';
import { MongodbPostImageService } from './mongodb.postimage.service';
import { MongodbPostKeyService } from './mongodb.postkey.service';
import { MongodbReservationService } from './mongodb.reservation.service';
import { MongodbUserService } from './mongodb.user.service';
import { MongodbUserImageService } from './mongodb.userimage.service';

@Module({
  providers: [
    PrismaService,
    MongodbPostService,
    MongodbPostImageService,
    MongodbPostKeyService,
    MongodbReservationService,
    MongodbUserService,
    MongodbUserImageService,
  ],
  exports: [
    PrismaService,
    MongodbPostService,
    MongodbPostImageService,
    MongodbPostKeyService,
    MongodbReservationService,
    MongodbUserService,
    MongodbUserImageService,
  ],
})
export class MongodbModule {}
