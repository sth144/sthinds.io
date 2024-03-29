import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const dotenv = require('dotenv');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
