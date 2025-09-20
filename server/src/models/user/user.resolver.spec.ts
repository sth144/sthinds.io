import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const userInfo = [
  {
    _id: '12345',
    firstName: 'Johnny',
    lastName: 'Appleseed',
    email: 'j@a.com',
    accessToken: 'asdf1234',
  },
  {
    _id: '67890',
    firstName: 'Jane',
    lastName: 'Appleseed',
    email: 'j@a.com',
    accessToken: 'asdf1234',
  },
];

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useFactory: async () => ({
            create: async (dto: object): Promise<User> => {
              return userInfo[0] as User;
            },
            findOne: async (_id: string): Promise<User> => {
              return userInfo.filter((user) => user._id === _id)[0] as User;
            },
            findAll: async (): Promise<User[]> => {
              return userInfo as User[];
            },
          }),
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe("'users' query", () => {
    it('should return an array of users', async () => {
      const users = await resolver.users();

      expect(Array.isArray(users)).toBe(true);
    });
  });
  describe("'user' query", () => {
    it('should return one user with matching ID', async () => {
      const user = await resolver.user('12345');

      expect(user._id).toBe('12345');
      expect(user.firstName).toBe('Johnny');
    });
  });
});
