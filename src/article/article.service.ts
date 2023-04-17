import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleEntity } from "./article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./../user/user.entity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) 
    private readonly articleRepository: Repository<ArticleEntity>
    ) {}

  async createArticle(
    currentUser: UserEntity, 
    createArticleDto: CreateArticleDto
    ): Promise<ArticleEntity> {
      const article = new ArticleEntity();
      Object.assign(article, createArticleDto);
      if (!article.tagList) {
        article.tagList = [];
      }

      article.slug = 'fooooo';

      article.author = currentUser;

      return await this.articleRepository.save(article);
  }
}