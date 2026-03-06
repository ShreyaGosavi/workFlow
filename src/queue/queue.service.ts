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
      priority: 1,
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
      priority: 10,
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: job.data,
    };
  }

  async deleteJob(jobId: string) {
    const job = await this.queue.getJob(jobId);

    if (!job) {
      return null;
    }

    const state = await job.getState();

    if (state === 'active') {
      throw new Error('Cannot delete an active job');
    }

    await job.remove();

    return {
      id: jobId,
      state,
      message: 'Job removed from queue',
    };
  }

  async getQueueSnapshot() {
    const waiting = await this.queue.getWaitingCount();
    const active = await this.queue.getActiveCount();
    const completed = await this.queue.getCompletedCount();
    const failed = await this.queue.getFailedCount();

    return {
      waiting,
      active,
      completed,
      failed,
    };
  }
}
