

import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Article, ArticleDTO, ArticleInput } from "./article";
import { ArticleService } from "./article.service";

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => String)
  async author() {
  	return "Hello World";
  }

  @Query(() => [ArticleDTO])
  public async articles(): Promise<Article[]> {
    const result = await this.articleService.findAll();
    
    return await this.articleService.findAll()
  }

  @Query(() => ArticleDTO)
  public async article(@Args("_id") _id: string): Promise<Article> {
    return await this.articleService.findOne(_id);
  }

  @Mutation(() => ArticleDTO)
  public async createArticle(
    @Args("authorID") authorID: string,
    @Args("title") title: string,
    @Args("subtitle") subtitle: string,
    // TODO: enforce coherent date type
    @Args("date") date: string,
    @Args("text") text: string,
  ): Promise<Article> {
    const input: ArticleInput = {
      authorID,
      title,
      subtitle,
      date,
      text
    }
    return this.articleService.create(input);
  }
}