import { MigrationInterface, QueryRunner } from 'typeorm';

export default class FixPriceIntToFloat1616002566291
  implements MigrationInterface {
  name = 'FixPriceIntToFloat1616002566291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "price" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "price" integer NOT NULL`,
    );
  }
}
