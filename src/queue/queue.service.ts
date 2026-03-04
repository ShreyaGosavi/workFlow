import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { NotificationDto } from '../jobs/dto/notification.dto';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('workflow-queue')
    private readonly queue: Queue,
  ) {}

  async addNotificationJob(data: NotificationDto) {
    return  this.queue.add('notification', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
    });
  }
}
