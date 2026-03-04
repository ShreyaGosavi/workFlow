import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Queue } from 'bullmq';
import { getQueueToken } from '@nestjs/bullmq';
import { setupBullBoard } from './queue/bull-board';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const queue = app.get<Queue>(getQueueToken('workflow-queue'));
  const serverAdapter = setupBullBoard(queue);

  app.use('/admin/queues', serverAdapter.getRouter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
