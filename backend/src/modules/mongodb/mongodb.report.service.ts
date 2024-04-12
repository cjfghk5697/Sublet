import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostReportDto } from '@/dto/report.dto';
import { UserInterface } from '@/interface/user.interface';
import { ReportInterface } from '@/interface/report.interface';
import { PostInterface } from '@/interface/post.interface';

@Injectable()
export class MongodbReportService {
  constructor(private prisma: PrismaService) {}

  async postReport(body: PostReportDto, user: UserInterface) {
    const ret: ReportInterface = await this.prisma.report.create({
      data: {
        reporter_id: user.user_id,
        post_key: body.post_key,
        reason: body.reason,
      },
      select: {
        id: true,
        version: true,
        deleted: true,
        reporter_id: true,
        post_key: true,
        reason: true,
        post: true,
      },
    });
    delete (ret as { post?: PostInterface }).post;
    return ret;
  }
}
