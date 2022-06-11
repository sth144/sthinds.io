// TODO: refactor/merge

import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@Entity({ name: "article" })
export class Article {
  @ObjectIdColumn({ generated: true }) public readonly _id: number;
  @Column(/**() => String*/) public title: string;
  @Column(/**() => String*/) public subtitle: string;
  @Column(/**() => String*/) public author: string;
  @Column(/**() => String*/) public date: string;
  @Column(/**() => String*/) public text: string;

  constructor() { }
};

// TODO: these should be subclasses to avoid duplication
// TODO: these should be defined in lib and shared by client and server

@ObjectType()
export class ArticleDTO {
  @Field({ nullable: true })
  readonly _id: string;
  @Field()
  readonly title: string;
  @Field()
  readonly subtitle: string;
  // TODO: this shouldn't be nullable
  @Field()
  readonly author: string;
  @Field()
  readonly date: string;
  @Field()
  readonly text: string;
};

@InputType()
export class ArticleInput {
  @Field()
  readonly title: string;
  @Field()
  readonly subtitle: string;
  @Field()
  readonly author: string;
  @Field()
  readonly date: string;
  @Field()
  readonly text: string;
}