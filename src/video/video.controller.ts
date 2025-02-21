import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller('video')
export class VideoController {
  constructor(@InjectQueue('video') private readonly videoQueue: Queue) {}

  @Post('process')
  async processVideo(@Body() createDto: Record<string, any>) {
    await this.videoQueue.add(
      'video',
      {
        ...createDto,
      },
      {},
    );
  }
}
