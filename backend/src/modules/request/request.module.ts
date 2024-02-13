import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [MongodbModule],
  exports: [RequestService],
})
export class RequestModule {}
