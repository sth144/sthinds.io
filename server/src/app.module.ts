import { CacheModule, CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ArticleModule } from "./models/article.module"
import { Article } from './models/article';

export const serveStaticImport = ServeStaticModule.forRoot({
  rootPath: (process.env.CLIENT_BUNDLE_DIR !== undefined) ? 
    process.env.CLIENT_BUNDLE_DIIR : join(__dirname, "../../client/build/"),
  exclude: ["/graphql"]
});

// TODO:: separate this out into an API module?
export const graphQLImport = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: "./schema.gql",
  installSubscriptionHandlers: true,
  playground: true
  // TODO: redis???
});

@Module({
  imports: [
    serveStaticImport,
    // TODO: separate these out into storage module?
    // TODO: get a TypeORM/MongoDB query working
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
    // TODO: get a Redis query working
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT) 
      }
    }),
    // TODO: get an Apollo query working from client
    graphQLImport,
    ArticleModule
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
