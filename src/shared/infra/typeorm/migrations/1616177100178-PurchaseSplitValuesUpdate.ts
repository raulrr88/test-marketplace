import { MigrationInterface, QueryRunner } from 'typeorm';

export default class PurchaseSplitValuesUpdate1616177100178
  implements MigrationInterface {
  name = 'PurchaseSplitValuesUpdate1616177100178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "marketplaceFee"`,
    );
    await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "storeFee"`);
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "paymentPlatformFee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "total" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "marketplacePercentage" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "marketplaceValue" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "storePercentage" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "storeValue" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "paymentPlatformPercentage" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "paymentPlatformValue" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "feePercentage"`);
    await queryRunner.query(
      `ALTER TABLE "stores" ADD "feePercentage" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "feePercentage"`);
    await queryRunner.query(
      `ALTER TABLE "stores" ADD "feePercentage" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "paymentPlatformValue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "paymentPlatformPercentage"`,
    );
    await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "storeValue"`);
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "storePercentage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "marketplaceValue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "marketplacePercentage"`,
    );
    await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "total"`);
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "paymentPlatformFee" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "storeFee" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "marketplaceFee" integer NOT NULL`,
    );
  }
}
