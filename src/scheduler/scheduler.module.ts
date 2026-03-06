import { Module } from '@nestjs/common';
import { CleanupScheduler } from './cleanup.schedular';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [QueueModule],
  providers: [CleanupScheduler],
})
export class SchedulerModule {}
