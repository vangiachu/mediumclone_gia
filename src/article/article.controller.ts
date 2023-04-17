import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "./../user/guards/auth.guard";
import { User } from "./../user/decorators/user.decorator";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { UserEntity } from "./../user/user.entity";

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity, 
    @Body('article') createArticleDto: CreateArticleDto
    ): Promise<any> {
    return await this.articleService.createArticle(
      currentUser, createArticleDto
      );
  }
}