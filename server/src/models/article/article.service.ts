import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, MongoRepository } from "typeorm";
import { Article } from "./article";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: MongoRepository<Article>,
    @Inject(CACHE_MANAGER) 
    private readonly cacheManager
  ) { }

  public async create(dto: object): Promise<Article> {
    const articleCreated: Article = await this.articleRepository.save(dto);
    return articleCreated;
  }

  public async findAll(): Promise<Article[]> {
    const articlesFound = await this.articleRepository.find();

    return articlesFound;
  }

  public async findOne(_id: string): Promise<Article> {
    const articleFound = await this.articleRepository.findOne(_id);

    await this.cacheManager.set(_id, articleFound);

    return articleFound;
  }

  public async updateArticle(_id: string, update: Partial<Article>): Promise<Article> {
    await this.articleRepository.update(_id, update);

    return await this.findOne(_id);
  }

  public async deleteArticle(_id: string): Promise<DeleteResult> {
    return await this.articleRepository.delete(_id);
  }
}