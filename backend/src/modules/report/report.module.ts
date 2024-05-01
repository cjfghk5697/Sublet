import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  providers: [ReportService],
  controllers: [ReportController],
  imports: [MongodbModule],
})
export class ReportModule {}
