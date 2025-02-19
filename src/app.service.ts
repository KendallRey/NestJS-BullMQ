import { Injectable } from '@nestjs/common';
import { delay } from 'bullmq';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async testDelay() {
    await delay(2000);
    return true;
  }
}
