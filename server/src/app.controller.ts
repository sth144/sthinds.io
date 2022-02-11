import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // TODO: connect to MongoDB via TypeORM (@nestjs/typeorm)
  // TODO: connect to Redis cache via TypeORM (cache-manager-redis-store)
}

