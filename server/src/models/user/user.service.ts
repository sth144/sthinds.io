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
    private readonly cacheManager
  ) { }

  public async create(dto: object): Promise<User> {
    const userCreated: User = await this.userRepository.save(dto);
    return userCreated;
  }

  public async registerOAuthUser(profile: IGoogleAuthProfile, 
                                 provider: OAuthProvider): Promise<User> {
    const dto: UserInput = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      // TODO: store access token?
      accessToken: null,
      thirdPartyID: profile.id,
      thirdPartyIDProvider: OAuthProvider.Google
    };

    const userCreated: User = await this.userRepository.save(dto);

    return  userCreated;
  }

  public async findAll(): Promise<User[]> {
    const usersFound = await this.userRepository.find();

    return usersFound;
  }

  public async findOne(_id: string): Promise<User> {

    const userFound = await this.userRepository.findOne(_id);

    if (userFound) {
      await this.cacheManager.set(_id, JSON.stringify(userFound));
    }
    
    return userFound;
  }

  public async findOneByThirdPartyId(id: string, provider: OAuthProvider): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        thirdPartyId: id,
        thirdPartyIdProvider: provider
      }
    });

    return userFound;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        email
      }
    });

    return userFound;
  }

  // TODO: implement patch user feature
  public async patchUser(_id: string, update: Partial<User>): Promise<User> {
    await this.userRepository.update(_id, update);

    return await this.findOne(_id);
  }

  public async deleteUser(_id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(_id);
  }
}