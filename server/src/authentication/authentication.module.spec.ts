import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationModule } from './authentication.module';
import { GoogleOAuthService } from './google-oauth.service';
import { IGoogleAuthProfile, OAuthProvider } from 'sthinds.io-lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'models/user/user';
import { CacheModule } from '@nestjs/common';
import { UserModule } from 'models/user/user.module';

const dotenv = require('dotenv');

const TypeOrmMongoDBTestingModule = () => [
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mongodb',
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT),
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
      authSource: 'admin',
      database: 'test',
      entities: [User],
      synchronize: true,
      loggerLevel: 'error',
      /** generate a random connection name */
      name: Math.random().toString().substring(2, 10),
    }),
  }),
  CacheModule.register(),
];

let testModule: TestingModule;

describe('AuthenticationModule', () => {
  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmMongoDBTestingModule(),
        UserModule,
        AuthenticationModule,
      ],
    }).compile();
  });

  describe('GoogleOAuthService', () => {
    it('should return a valid JWT when passed a valid profile input', async () => {
      // TODO: get this test working
      // try {
      //   const oAuthService =
      //     testModule.get<GoogleOAuthService>(GoogleOAuthService);
      //   const profileInput: IGoogleAuthProfile = {
      //     emails: [
      //       {
      //         value: 'abc@def.com',
      //       },
      //     ],
      //     name: {
      //       givenName: 'John',
      //       familyName: 'Tester',
      //     },
      //     id: Math.random().toString(32).substring(2, 10),
      //   };
      //   const token = await oAuthService.getGoogleOAuthLoginJWT(profileInput);
      //   const tokenParsed = JSON.parse(
      //     Buffer.from(token.split('.')[1], 'base64').toString(),
      //   );
      //   expect(tokenParsed.provider).toBe(OAuthProvider.Google);
      // } catch (err) {
      //   console.error(err);
      // }
    });
    it.todo('should throw an error when passed an invalid profile input');
  });
});
