import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { serveStaticImport } from './../src/app.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // NOTE: the argument passed to createTestingModule should look almost
    //  the identical to AppModule decorator argument, without database
    //  or cache modules
    // TODO: implement and maintain a TestAppModule?
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        serveStaticImport
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
