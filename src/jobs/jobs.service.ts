import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { NotificationDto } from './dto/notification.dto';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class JobsService {
  constructor(private readonly queueService: QueueService) {}

  async sendNotification(data: NotificationDto) {
    return this.queueService.addNotificationJob(data);
  }

  async generateReport(data: ReportDto) {
    return this.queueService.addReportJob(data);
  }

  async getJobStatus(jobId: string) {
    return this.queueService.getJobStatus(jobId);
  }

  async deleteJob(jobId: string) {
    return this.queueService.deleteJob(jobId);
  }
}
