import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Article } from "./article";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: MongoRepository<Article>
  ) { }

  public async create(dto: object): Promise<Article> {
    const articleCreated: Article = await this.articleRepository.save(dto);
    return articleCreated;
  }

  public async findAll(): Promise<Article[]> {
    const articlesFound = await this.articleRepository.find();
    return articlesFound;
  }
}