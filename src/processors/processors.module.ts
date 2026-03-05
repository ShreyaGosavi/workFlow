import { Module } from '@nestjs/common';
import { NotificationProcessor } from './notification.processor';
import { ReportProcessor } from './report.processor';

@Module({
  providers: [NotificationProcessor, ReportProcessor],
})
export class ProcessorsModule {}
