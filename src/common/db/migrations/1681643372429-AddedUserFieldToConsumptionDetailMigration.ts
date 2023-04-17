import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserFieldToConsumptionDetailMigration1681643372429 implements MigrationInterface {
    name = 'AddedUserFieldToConsumptionDetailMigration1681643372429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "total" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "total"`);
    }

}
