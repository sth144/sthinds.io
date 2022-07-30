

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { OAuthProvider } from "sthinds.io-lib";
import { User, UserDTO, UserInput } from "./user";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDTO])
  public async users(): Promise<User[]> {
    const result = await this.userService.findAll();
    
    return await this.userService.findAll()
  }

  @Query(() => UserDTO)
  public async user(@Args("_id") _id: string): Promise<User> {
    return await this.userService.findOne(_id);
  }

  @Query(() => UserDTO)
  public async getUserByEmail(@Args("email") email: string): Promise<User> {
    return await this.userService.findOneByEmail(email);
  }

  // NOTE: this isn't currently used. Should be removed if it will never be used
  @Mutation(() => UserDTO)
  public async createUser(
    @Args("email") email: string,
    @Args("firstName") firstName: string,
    @Args("lastName") lastName: string,
    @Args("accessToken") accessToken: string,
    @Args("thirdPartyID") thirdPartyID: string,
    @Args("thirdPartyIDProvider") thirdPartyIDProvider: OAuthProvider,
  ): Promise<User> {
    const input: UserInput = {
      email,
      firstName,
      lastName,
      accessToken,
      thirdPartyID,
      thirdPartyIDProvider
    };
    
    return this.userService.create(input);
  }
}