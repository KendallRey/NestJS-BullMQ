import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { VideoController } from './video/video.controller';
import { VideoWorker } from './video/video.worker';
import { VideoQueueEventsListener } from './video/video-queue.events';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 3,
        removeOnFail: 6,
        backoff: 2000,
      },
    }),
    BullModule.registerQueue({
      name: 'video',
    }),
  ],
  controllers: [VideoController],
  providers: [VideoWorker, VideoQueueEventsListener],
})
export class AppModule {}
