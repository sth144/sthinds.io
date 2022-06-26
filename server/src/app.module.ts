import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ArticleModule } from "./models/article.module"
import { AuthenticationModule } from "./authentication/authentication.module";
import { StorageModule } from "./database/storage.module";

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
    // TODO: connect to Redis cache via TypeORM (cache-manager-redis-store)
    StorageModule,
    graphQLImport,
    ArticleModule,
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
