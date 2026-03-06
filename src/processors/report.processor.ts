import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('workflow-queue', {
  concurrency: 2,
  limiter: {
    max: 2,
    duration: 3000,
  },
})
export class ReportProcessor extends WorkerHost {
  private readonly logger = new Logger(ReportProcessor.name);

  async process(job: Job) {
    if (job.name !== 'report') return;

    this.logger.log(`Starting report job ${job.id}`);

    const steps = 5;

    for (let i = 1; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const progress = Math.floor((i / steps) * 100);

      await job.updateProgress(progress);

      this.logger.log(`Report job ${job.id} progress: ${progress}%`);
    }

    this.logger.log(`Report job ${job.id} completed`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Report job ${job.id} completed successfully`);
  }
}
