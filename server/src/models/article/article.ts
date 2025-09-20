// TODO: refactor/merge

import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IArticle } from "sthinds.io-lib";

@Entity({ name: "article" })
export class Article implements IArticle {
  @ObjectIdColumn({ generated: true }) public readonly _id: string;
  @Column(/**() => String*/) public title: string;
  @Column(/**() => String*/) public subtitle: string;
  @Column(/**() => String*/) public authorID: string;
  @Column(/**() => String*/) public date: string;
  @Column(/**() => String*/) public text: string;

  constructor() {}
}

@ObjectType()
export class ArticleDTO implements IArticle {
  @Field({ nullable: true })
  readonly _id: string;
  @Field()
  readonly title: string;
  @Field()
  readonly subtitle: string;
  // TODO: this shouldn't be nullable
  @Field()
  readonly authorID: string;
  @Field()
  readonly date: string;
  @Field()
  readonly text: string;
}

@InputType()
export class ArticleInput implements IArticle {
  @Field()
  readonly title: string;
  @Field()
  readonly subtitle: string;
  @Field()
  readonly authorID: string;
  @Field()
  readonly date: string;
  @Field()
  readonly text: string;
}
