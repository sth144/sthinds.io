import { CacheModule, CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import type { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
      }
    }),
  ],
  controllers: [],
  // TODO: implement a RedisCacheService and inject where needed
  providers: [],
})
export class RedisCacheModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager) {
    const client = cacheManager.store.getClient();
    client.on("error", (err) => {

    });
  }
}