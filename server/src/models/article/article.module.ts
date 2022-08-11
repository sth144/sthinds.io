import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisClientOptions } from "redis";
import { Article } from "./article";
import { ArticleResolver } from "./article.resolver";
import { ArticleService } from "./article.service";
import { redisClientOptions } from "database/redis-cache.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    // TODO: can we get rid of this redundant register by providing a global redis cache service?
    CacheModule.register<RedisClientOptions>(redisClientOptions),
  ],
  providers: [ArticleResolver, ArticleService]
})
export class ArticleModule { }