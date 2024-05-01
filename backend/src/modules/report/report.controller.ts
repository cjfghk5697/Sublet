import { PostReportDto } from '@/dto/report.dto';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { UserInterface } from '@/interface/user.interface';
import { User } from '@/user/user.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(LoggedInGuard)
  async postReport(@Body() body: PostReportDto, @User() user: UserInterface) {
    if (!user) throw new UnauthorizedException();

    try {
      const res = await this.reportService.postReport(body, user);
      return res;
    } catch (e) {
      console.log('[report.controller] error: ', e);
      throw new BadRequestException();
    }
  }
}
