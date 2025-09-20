import { CacheModule, CACHE_MANAGER, Inject, Module } from "@nestjs/common";
import type { RedisClientOptions } from "redis";

export const redisClientOptions =
  process.env.hasOwnProperty("REDIS_USERNAME") &&
  process.env.REDIS_USERNAME.length > 0
    ? {
        /** for connection to Heroku Redis */
        store: require("cache-manager-redis-store"),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        socket: {
          tls: true,
        },
        rejectUnauthorized: false,
      }
    : {
        store: require("cache-manager-redis-store"),
        socket: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        },
      };

@Module({
  imports: [CacheModule.register<RedisClientOptions>(redisClientOptions)],
  controllers: [],
  // TODO: implement a RedisCacheService and inject where needed
  providers: [],
})
export class RedisCacheModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager) {
    const client = cacheManager.store.getClient();
    client.on("error", (err) => {});
  }
}
