import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('workflow-queue', {
  concurrency: 3,
})
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);

  async process(job: Job) {
    if (job.name === 'notification') {
      this.logger.log(`Processing notification job ${job.id}`);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { email, message } = job.data;

      // simulate sending notification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.logger.log(`Notification sent to ${email}: ${message}`);
    }
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.log(`Job ${job.id} started`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} failed: ${error.message}`);
  }
}
