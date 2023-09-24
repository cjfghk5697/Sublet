import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MongodbService, PrismaService],
  exports: [UserService, MongodbService],
})
export class UserModule {}
