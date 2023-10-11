import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  imports: [MongodbModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, MongodbService],
  exports: [UserService],
})
export class UserModule {}
