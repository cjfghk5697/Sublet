import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbPostService } from './mongodb.post.service';
import { MongodbPostImageService } from './mongodb.postimage.service';
import { MongodbPostKeyService } from './mongodb.postkey.service';
import { MongodbReservationService } from './mongodb.reservation.service';
import { MongodbUserService } from './mongodb.user.service';
import { MongodbUserImageService } from './mongodb.userimage.service';
import { MongodbRequestService } from './mongodb.request.service';
import { MongodbChatService } from './mongodb.chat.service';
import { MongodbTestDBService } from './mongodb.testdb';

@Module({
  providers: [
    PrismaService,
    MongodbPostService,
    MongodbPostImageService,
    MongodbPostKeyService,
    MongodbReservationService,
    MongodbUserService,
    MongodbUserImageService,
    MongodbRequestService,
    MongodbChatService,
    MongodbTestDBService,
  ],
  exports: [
    PrismaService,
    MongodbPostService,
    MongodbPostImageService,
    MongodbPostKeyService,
    MongodbReservationService,
    MongodbUserService,
    MongodbUserImageService,
    MongodbRequestService,
    MongodbChatService,
    MongodbTestDBService,
  ],
})
export class MongodbModule {}
