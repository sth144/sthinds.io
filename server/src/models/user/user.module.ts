import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { User } from "./user";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

const userModuleImports = [
  TypeOrmModule.forFeature([User]),
  // TODO: can we get rid of this redundant register by providing a global redis cache service?
  CacheModule.register<RedisClientOptions>({
    store: redisStore,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT)
    }
  }),
];

@Module({
  imports: userModuleImports,
  providers: [UserResolver, UserService],
  exports: [UserResolver, UserService, ...userModuleImports]
})
export class UserModule { }