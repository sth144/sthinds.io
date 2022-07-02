import { Test, TestingModule } from "@nestjs/testing";
import { GoogleOAuthService } from "./google-oauth.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "models/user/user";
import { UserModule } from "models/user/user.module";
import { CacheModule } from "@nestjs/common";
import { UserService } from "../models/user/user.service";

describe("GoogleOAuthService", () => {
  let service: GoogleOAuthService;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        GoogleOAuthService,
        /** mock User TypeORM repository so we don't need a database  */
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn()
          }
        },
        { 
          provide: UserService,
          useValue: {
            findOneByThirdPartyId: jest.fn(),
            registerOAuthUser: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<GoogleOAuthService>(GoogleOAuthService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should have User repository injected", () => {
    expect(userRepo).toBeDefined();
  })
});