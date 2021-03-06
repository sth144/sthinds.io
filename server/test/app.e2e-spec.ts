import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { graphQLImport, serveStaticImport } from "app.module";
import { AppController } from "app.controller";
import { AppService } from "app.service";
import { ArticleModule } from "models/article/article.module";
import { TypeOrmMongoDBTestingModule } from './typeorm.mock';

let app: INestApplication;

describe('AppController (e2e)', () => {

  beforeEach(async () => {
    // NOTE: the argument passed to createTestingModule should look almost
    //  the identical to AppModule decorator argument, without database
    //  or cache modules
    // TODO: implement and maintain a TestAppModule?
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        serveStaticImport,
        graphQLImport,
        ...TypeOrmMongoDBTestingModule(),
        ArticleModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const result = request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
    return result;
  });

  afterAll(() => {
    app.close();
  });
});
