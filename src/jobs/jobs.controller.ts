import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { JobsService } from './jobs.service';
import { ReportDto } from './dto/report.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('notification')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendNotification(@Body() body: NotificationDto) {
    return this.jobsService.sendNotification(body);
  }

  @Post('report')
  @HttpCode(HttpStatus.ACCEPTED)
  async createReport(@Body() body: ReportDto) {
    const job = await this.jobsService.generateReport(body);

    return {
      message: 'Report job accepted',
      jobId: job.id,
    };
  }
}
