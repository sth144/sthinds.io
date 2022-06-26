import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from "../models/article.module"
import { Article } from '../models/article';
import { RedisCacheModule } from "./redis-cache.module";

/**
 * Module for injecting TypeORM MongoDB connection and Redis cache
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT),
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
      authSource: "admin",
      database: process.env.NODE_ENV === "dev" ? "dev" 
                 : process.env.NODE_ENV === "test" ? "test" 
                 : "prod",
      entities: [Article],
      synchronize: true,
      loggerLevel: "info"
    }),
    RedisCacheModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class StorageModule { }
