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

    return result;
  }

  @Query(() => UserDTO)
  public async user(@Args("_id") _id: string): Promise<User> {
    const result = await this.userService.findOne(_id);
    return result;
  }

  @Query(() => UserDTO, { nullable: true })
  public async getUserByEmail(
    @Args("email") email: string,
  ): Promise<User | null> {
    let result = await this.userService.findOneByEmail(email);
    if (!result) {
      result = null;
    }
    return result;
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
      thirdPartyIDProvider,
    };

    return this.userService.create(input);
  }

  // TODO: call mutations for updating and deleting user
  @Mutation(() => UserDTO)
  public async patchUser(
    @Args("_id") _id: string,
    @Args("patch") patch: UserInput,
  ): Promise<User> {
    return await this.userService.patchUser(_id, patch);
  }

  @Mutation(() => UserDTO /**Boolean*/)
  public async deleteUser(@Args("_id") _id: string): Promise<boolean> {
    let result = true;
    try {
      await this.userService.deleteUser(_id);
    } catch (e) {
      result = false;
    }
    return result;
  }
}
