import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { QueueModule } from './queue/queue.module';
import { JobsModule } from './jobs/jobs.module';
import redisConfig from './config/redis.config';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig],
    }),

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: 'default',
        password: process.env.REDIS_PASSWORD,
        tls: {
          servername: 'workflow-redis-shreya.redis.cache.windows.net',
          rejectUnauthorized: false,
        },
        connectTimeout: 10000,
        maxRetriesPerRequest: null,
      },
    }),

    ScheduleModule.forRoot(),

    QueueModule,

    JobsModule,

    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
