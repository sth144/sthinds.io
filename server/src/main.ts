import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const dotenv = require("dotenv").config(__dirname);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap(); 
