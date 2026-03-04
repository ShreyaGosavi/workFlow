import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class JobsService {
  constructor(private readonly queueService: QueueService) {}

  async sendNotification(data: NotificationDto) {
    return this.queueService.addNotificationJob(data);
  }
}
