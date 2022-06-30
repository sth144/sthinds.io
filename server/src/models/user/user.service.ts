import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { User } from "./user";

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

  public async findAll(): Promise<User[]> {
    const usersFound = await this.userRepository.find();

    return usersFound;
  }

  public async findOne(_id: string): Promise<User> {
    const userFound = await this.userRepository.findOne(_id);

    await this.cacheManager.set(_id, userFound);

    return userFound;
  }
}