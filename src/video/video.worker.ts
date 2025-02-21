import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('video')
export class VideoWorker extends WorkerHost {
  async process(job: Job, token?: string) {
    console.log(`New Job: ${job.id}`, job.data);
  }
}
