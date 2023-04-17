import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleEntity } from "./article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { UserEntity } from "./../user/user.entity";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import slugify from "slugify";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";

@Injectable()
export class ArticleService {
  constructor(private dataSource: DataSource,
    @InjectRepository(ArticleEntity) 
    private readonly articleRepository: Repository<ArticleEntity>
    ) {}

    async findAll(currentUserId: number, query: any): Promise<ArticlesResponseInterface> {
      const queryBuilder = this.dataSource.getRepository(ArticleEntity);
    }

  async createArticle(
    currentUser: UserEntity, 
    createArticleDto: CreateArticleDto
    ): Promise<ArticleEntity> {
      const article = new ArticleEntity();
      Object.assign(article, createArticleDto);
      if (!article.tagList) {
        article.tagList = [];
      }

      article.slug = this.getSlug(createArticleDto.title);

      article.author = currentUser;

      return await this.articleRepository.save(article);
  }

  async deleteArticle(slug: string, currentId: number): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    slug: string, 
    updateArticleDto: CreateArticleDto, 
    currentUserId: number
    ): Promise<ArticleEntity> {
      const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article);
  }

  async findBySlug(slug:string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({ where: { slug } });
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, {lower: true}) + 
      '-' + 
      ((Math.random() * Math.pow(36,6)) | 0).toString(36)
    );
  }
}