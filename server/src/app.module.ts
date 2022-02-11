import { CacheModule, CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";

export const serveStaticImport = ServeStaticModule.forRoot({
  rootPath: join(__dirname, "../../client/build/"),
});

@Module({
  imports: [
    serveStaticImport,
    // TODO: separate these out into storage module?
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT),
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
      database: process.env.NODE_ENV === "test" ? "test" : "prod",
      entities: [],
      synchronize: true
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT) 
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager) {
    const client = cacheManager.store.getClient();

    client.on("error", (err) => {

    });
  }
}
