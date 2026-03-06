import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationProcessor } from './notification.processor';
import { ReportProcessor } from './report.processor';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    QueueModule,
  ],
  providers: [NotificationProcessor, ReportProcessor],
})
export class ProcessorsModule {}
