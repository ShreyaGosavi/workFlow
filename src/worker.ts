import { NestFactory } from '@nestjs/core';
import { ProcessorsModule } from './processors/processors.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ProcessorsModule);

  console.log('Worker started and listening for jobs...');
}

bootstrap();