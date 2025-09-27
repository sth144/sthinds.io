import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "models/article/article.module";
import { Article } from "models/article/article";
import { UserModule } from "models/user/user.module";
import { User } from "models/user/user";
import { RedisCacheModule } from "./redis-cache.module";

const connectionProps = process.env.hasOwnProperty("MONGODB_CONNECTION_STRING")
  ? {
      /** for connection to MongoDB Atlas */
      url: process.env.MONGODB_CONNECTION_STRING,
      useNewUrlParser: true,
    }
  : {
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT),
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
    };

const database =
  process.env.NODE_ENV === "development"
    ? "dev"
    : process.env.NODE_ENV === "test"
    ? "test"
    : "prod";

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Database:", database);
console.log("Connection props:", connectionProps);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      ...connectionProps,
      authSource: "admin",
      database,
      entities: [Article, User],
      synchronize: true,
      loggerLevel: "info",
    }),

    RedisCacheModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class StorageModule {}
