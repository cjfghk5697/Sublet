import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  exports: [ReservationService],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
