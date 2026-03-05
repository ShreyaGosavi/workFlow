import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { NotificationDto } from '../jobs/dto/notification.dto';
import { ReportDto } from '../jobs/dto/report.dto';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('workflow-queue')
    private readonly queue: Queue,
  ) {}

  async addNotificationJob(data: NotificationDto) {
    return this.queue.add('notification', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
    });
  }

  async addReportJob(data: ReportDto) {
    return this.queue.add('report', data, {
      attempts: 2,
      removeOnComplete: true,
    });
  }

  async getJobStatus(jobId: string) {
    const job = await this.queue.getJob(jobId);

    if (!job) {
      return null;
    }

    const state = await job.getState();

    return {
      id: job.id,
      state,
      progress: job.progress,
      data: job.data,
    };
  }
}
