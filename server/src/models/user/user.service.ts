import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, MongoRepository } from "typeorm";
import { User, UserDTO, UserInput } from "./user";
import { OAuthProvider, IGoogleAuthProfile } from "sthinds.io-lib";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager,
  ) {}

  public async create(dto: object): Promise<User> {
    const userCreated: User = await this.userRepository.save(dto);
    return userCreated;
  }

  public async registerOAuthUser(
    profile: IGoogleAuthProfile,
    provider: OAuthProvider,
  ): Promise<User> {
    const dto: UserInput = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      accessToken: null,
      thirdPartyID: profile.id,
      thirdPartyIDProvider: OAuthProvider.Google,
    };

    const userCreated: User = await this.userRepository.save(dto);
    return userCreated;
  }

  public async findAll(): Promise<User[]> {
    const usersFound = await this.userRepository.find();
    return usersFound;
  }

  public async findOne(_id: string): Promise<User | null> {
    let userFound = await this.userRepository.findOne(_id);

    if (userFound) {
      Object.assign(userFound, { _id: userFound._id.toString() }); // Ensure _id is a string
      userFound = JSON.parse(JSON.stringify(userFound)); // Deep clone to avoid issues
      console.log("User found:", userFound); // Log the user object before caching
      console.log(
        `First Name: ${userFound.firstName}, Last Name: ${userFound.lastName}, ID: ${userFound._id}`,
      ); // Log names
      const cacheKey = String(_id);

      await this.cacheManager.set(cacheKey, JSON.stringify(userFound), {
        ttl: 3600,
      });
    }

    return userFound;
  }

  public async findOneByThirdPartyId(
    id: string,
    provider: OAuthProvider,
  ): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        thirdPartyId: id,
        thirdPartyIdProvider: provider,
      },
    });

    return userFound;
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    console.log(`Searching for user with email: ${email}`); // Log the email being searched
    const userFound = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!userFound) {
      console.log(`No user found with email: ${email}`); // Log if no user is found
    }

    return userFound;
  }

  public async patchUser(_id: string, update: Partial<User>): Promise<User> {
    await this.userRepository.update(_id, update);
    return await this.findOne(_id);
  }

  public async deleteUser(_id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(_id);
  }
}
