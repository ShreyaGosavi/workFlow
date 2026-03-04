import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('notification')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendNotification(@Body() body: NotificationDto) {
    return this.jobsService.sendNotification(body);
  }
}
