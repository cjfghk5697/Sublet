import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { MongodbModule } from '../mongodb/mongodb.module';
import { ReportService } from './report.service';

describe('ReportController', () => {
  let controller: ReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService],
      controllers: [ReportController],
      imports: [MongodbModule],
    }).compile();

    controller = module.get<ReportController>(ReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
