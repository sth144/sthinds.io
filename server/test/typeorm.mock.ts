import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from "../src/models/article";

const dotenv = require("dotenv");

console.log("TYPEORM MOCK");
console.log(process.env.MONGODB_HOST);
console.log(process.env.MONGODB_PORT);

export const TypeOrmMongoDBTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'mongodb',
    host: process.env.MONGODB_HOST,
    port: parseInt(process.env.MONGODB_PORT),
    username: "test",
    password: "test",
    // authSource: "admin",
    database: "test",
    entities: [Article],
    synchronize: true,
    loggerLevel: "info"
  })
];
