import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const dotenv = require("dotenv");

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  if (process.env.NODE_ENV === "development") {
    app.enableCors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    });
    console.log("Enabled CORS");
  }

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
