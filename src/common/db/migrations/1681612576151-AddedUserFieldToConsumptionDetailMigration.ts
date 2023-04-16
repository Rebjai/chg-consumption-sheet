import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserFieldToConsumptionDetailMigration1681612576151 implements MigrationInterface {
    name = 'AddedUserFieldToConsumptionDetailMigration1681612576151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1"`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ALTER COLUMN "staff_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_4f79974192afdc1fb9c10e41233" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_4f79974192afdc1fb9c10e41233"`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1"`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ALTER COLUMN "staff_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "user_id"`);
    }

}
