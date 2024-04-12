import { PostReportDto } from '@/dto/report.dto';
import { UserInterface } from '@/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { MongodbReportService } from '../mongodb/mongodb.report.service';
import {
  ReportExportInterface,
  ReportInterface,
} from '@/interface/report.interface';

@Injectable()
export class ReportService {
  constructor(private readonly reportDb: MongodbReportService) {}

  async postReport(body: PostReportDto, reporter: UserInterface) {
    const res = await this.reportDb.postReport(body, reporter);
    const ret = this.transformExport(res);
    return ret;
  }

  transformExport(report: ReportInterface): ReportExportInterface {
    delete (report as { id?: string }).id;
    delete (report as { version?: number }).version;
    delete (report as { deleted?: boolean }).deleted;
    return report;
  }
}
