import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from "../src/models/article/article";
import { User } from "../src/models/user/user";

const dotenv = require("dotenv");

export const TypeOrmMongoDBTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'mongodb',
    host: process.env.MONGODB_HOST,
    port: parseInt(process.env.MONGODB_PORT),
    username: "test",
    password: "test",
    // authSource: "admin",
    database: "test",
    entities: [Article, User],
    synchronize: true,
    loggerLevel: "error"
  })
];
