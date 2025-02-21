import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Post } from '@nestjs/common';
import { Job, Queue, QueueEvents } from 'bullmq';

@Controller('video')
export class VideoController {
  private queueEvents: QueueEvents;
  constructor(@InjectQueue('video') private readonly videoQueue: Queue) {
    this.queueEvents = new QueueEvents('video', {
      connection: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

  @Post('process')
  async processVideo(@Body() createDto: Record<string, any>) {
    const job = await this.videoQueue.add(
      'process',
      {
        ...createDto,
      },
      {},
    );
    await job.waitUntilFinished(this.queueEvents);
    const jobDone = await Job.fromId(this.videoQueue, job.id!);
    return jobDone?.returnvalue;
  }

  @Post('compress')
  async compressVideo(@Body() createDto: Record<string, any>) {
    await this.videoQueue.add(
      'compress',
      {
        ...createDto,
      },
      {},
    );
  }
}
