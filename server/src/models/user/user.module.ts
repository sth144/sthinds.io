import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisClientOptions } from "redis";
import { User } from "./user";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { redisClientOptions } from "database/redis-cache.module";

const userModuleImports = [
  TypeOrmModule.forFeature([User]),
  // TODO: can we get rid of this redundant register by providing a global redis cache service?
  CacheModule.register<RedisClientOptions>(redisClientOptions),
];

@Module({
  imports: userModuleImports,
  providers: [UserResolver, UserService],
  exports: [UserResolver, UserService, ...userModuleImports],
})
export class UserModule {}
