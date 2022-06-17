import { Injectable } from '@nestjs/common';

// TODO: get rid of this or use it to route to other services
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
