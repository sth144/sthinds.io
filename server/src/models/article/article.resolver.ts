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
    return result;
  }

  @Query(() => ArticleDTO)
  public async article(@Args("_id") _id: string): Promise<Article> {
    const result = await this.articleService.findOne(_id);
    return result;
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
      text,
    };

    return this.articleService.create(input);
  }

  // TODO: call mutations for updating and deleting article
  @Mutation(() => ArticleDTO)
  public async patchArticle(
    @Args("_id") articleID: string,
    @Args("patch") patch: ArticleInput,
  ): Promise<Article> {
    return await this.articleService.updateArticle(articleID, patch);
  }

  @Mutation(() => ArticleDTO)
  public async deleteArticle(@Args("_id") articleID: string): Promise<boolean> {
    let result = true;
    try {
      await this.articleService.deleteArticle(articleID);
    } catch (e) {
      result = false;
    }
    return result;
  }
}
