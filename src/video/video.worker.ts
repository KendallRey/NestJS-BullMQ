import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

const STEPS = [1, 2, 3, 4, 5];

@Processor('video', { concurrency: 3 })
export class VideoWorker extends WorkerHost {
  async process(job: Job) {
    switch (job.name) {
      case 'process':
        console.log('Start processing video');
        return await this.runTaskWithProgress(job);
      case 'compress':
        console.log('Start compressing video');
        return await this.runTaskWithProgress(job);
      default:
        throw new Error('Failed: unknown job!');
    }
  }

  async runTaskWithProgress(job: Job) {
    for (const step of STEPS) {
      await new Promise((res) => setTimeout(res, 200));
      const progress = Math.ceil((Number(step) / STEPS.length) * 100);
      job.updateProgress(progress);
    }
    return job.data;
  }

  @OnWorkerEvent('active')
  onAdded(job: Job) {
    console.log(`Job active: ${job.id}`, job.data);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    console.log(`Job progress: ${job.id}:`, `${job.progress}%`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job completed: ${job.id}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(`Job failed: ${job.id}`);
  }
}
