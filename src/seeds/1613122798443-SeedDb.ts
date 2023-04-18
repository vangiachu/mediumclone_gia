import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1613122798443 implements MigrationInterface {
    name = 'SeedDb1613122798443';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO tags (name) VALUES ('dragons), ('coffee'), ('nestjs')`
        );

        await queryRunner.query(
          // password is 123456
          `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '......................................')`
        );

        await queryRunner.query(
          `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First article description', 'First article body', 'coffee,dragons', 1), ('second-article', 'Second article', 'Second article description', 'Second article body', 'coffee,dragons', 1)`
        )

    }

    public async down(): Promise<void> {}

}
