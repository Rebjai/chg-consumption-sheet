import { MigrationInterface, QueryRunner } from "typeorm";

export class consumptionDetailDeletedByUserMigration1684986890182 implements MigrationInterface {
    name = 'consumptionDetailDeletedByUserMigration1684986890182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "deleted_by_id" integer`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_ac4fccbc151ddb69de4f856c105" FOREIGN KEY ("deleted_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_ac4fccbc151ddb69de4f856c105"`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "deleted_by_id"`);
    }

}
