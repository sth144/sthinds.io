

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

  @Mutation(() => ArticleDTO)
  public async createArticle(
    @Args("author") author: string,
    @Args("title") title: string,
    @Args("subtitle") subtitle: string,
    // TODO: enforce coherent date type
    @Args("date") date: string,
    @Args("text") text: string,
  ): Promise<Article> {
    const input: ArticleInput = {
      author,
      title,
      subtitle,
      date,
      text
    }
    return this.articleService.create(input);
  }
}