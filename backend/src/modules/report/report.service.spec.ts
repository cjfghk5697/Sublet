import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { ReportExportInterface } from '@/interface/report.interface';
import { reportExportInterfaceStub, userStub } from '@/stubs/mongodb.stub';
import { PostReportDto } from '@/dto/report.dto';
import { MongodbReportService } from '../mongodb/mongodb.report.service';
import { MongodbModule } from '../mongodb/mongodb.module';

jest.mock('../mongodb/mongodb.report.service');

const postReportDtoStub = (): PostReportDto => {
  return {
    post_key: 1,
    reason: 'Report Reason',
  };
};

describe('ReportService', () => {
  let service: ReportService;
  let mongodbReportService: MongodbReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService],
      imports: [MongodbModule],
    }).compile();

    service = module.get<ReportService>(ReportService);
    mongodbReportService =
      module.get<MongodbReportService>(MongodbReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TESTING postReport', () => {
    describe('calling method', () => {
      let result: ReportExportInterface | null;

      beforeAll(async () => {
        try {
          result = await service.postReport(postReportDtoStub(), userStub());
        } catch (_) {
          result = null;
        }
      });

      it('Should be defined', () => {
        expect(result).toBeDefined();
      });

      it('Should be same with export interface', () => {
        expect(result).toStrictEqual(reportExportInterfaceStub());
      });

      it("Should call mongodb's method 1 time", () => {
        expect(mongodbReportService.postReport).toHaveBeenCalledTimes(1);
        expect(mongodbReportService.postReport).toHaveBeenCalledWith(
          postReportDtoStub(),
          userStub(),
        );
      });
    });
  });
});
