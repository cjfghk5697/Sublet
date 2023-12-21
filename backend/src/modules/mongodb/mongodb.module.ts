import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbService } from './mongodb.service';

@Module({
  providers: [PrismaService, MongodbService],
  exports: [MongodbService],
})
export class MongodbModule {}
