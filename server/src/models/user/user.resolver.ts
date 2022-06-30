

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User, UserDTO, UserInput } from "./user";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async author() {
  	return "Hello World";
  }

  @Query(() => [UserDTO])
  public async users(): Promise<User[]> {
    const result = await this.userService.findAll();
    
    return await this.userService.findAll()
  }

  @Query(() => UserDTO)
  public async user(@Args("_id") _id: string): Promise<User> {
    return await this.userService.findOne(_id);
  }

  @Mutation(() => UserDTO)
  public async createUser(
    @Args("email") email: string,
    @Args("firstName") firstName: string,
    @Args("lastName") lastName: string,
    @Args("accessToken") accessToken: string,
  ): Promise<User> {
    const input: UserInput = {
      email,
      firstName,
      lastName,
      accessToken
    }
    return this.userService.create(input);
  }
}