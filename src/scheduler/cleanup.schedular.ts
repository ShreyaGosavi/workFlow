import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class CleanupScheduler {
  private readonly logger = new Logger(CleanupScheduler.name);

  constructor(
    @InjectQueue('workflow-queue')
    private readonly queue: Queue,
  ) {}

  @Cron('*/10 * * * * *')
  async cleanOldJobs() {
    this.logger.log('Running queue cleanup task');

    const cleanedCompleted = await this.queue.clean(
      60 * 60 * 1000,
      100,
      'completed',
    );

    const cleanedFailed = await this.queue.clean(60 * 60 * 1000, 100, 'failed');

    this.logger.log(
      `Cleanup done: ${cleanedCompleted.length} completed, ${cleanedFailed.length} failed jobs removed`,
    );
  }
}
