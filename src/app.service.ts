import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getError(): void {
    throw new Error("My first Sentry error!");
  }
}
