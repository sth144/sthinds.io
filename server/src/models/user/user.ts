import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IUser, OAuthProvider } from "sthinds.io-lib";

@Entity({ name: "user" })
export class User implements IUser {
  @ObjectIdColumn({ generated: true }) public readonly _id: string;
  @Column() public email: string;
  @Column() public firstName: string;
  @Column() public lastName: string;
  @Column() public accessToken: string;
  @Column() public thirdPartyID: string;
  @Column() public thirdPartyIDProvider: OAuthProvider;
}

@ObjectType()
export class UserDTO implements IUser {
  @Field({ nullable: true })
  readonly _id: string;
  @Field()
  readonly email: string;
  @Field()
  readonly firstName: string;
  @Field()
  readonly lastName: string;
  @Field()
  readonly accessToken: string;
  @Field()
  readonly thirdPartyID: string;
  @Field()
  readonly thirdPartyIDProvider: OAuthProvider;
}

@InputType()
export class UserInput implements IUser {
  @Field()
  readonly email: string;
  @Field()
  readonly firstName: string;
  @Field()
  readonly lastName: string;
  @Field()
  readonly accessToken: string;
  @Field()
  readonly thirdPartyID: string;
  @Field()
  readonly thirdPartyIDProvider: OAuthProvider;
}
