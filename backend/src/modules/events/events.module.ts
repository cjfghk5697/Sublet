import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  providers: [EventsGateway],
})
export class EventsModule {}
