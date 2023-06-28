import { MigrationInterface, QueryRunner } from "typeorm";

export class AreasImplementationMigration1687921375472 implements MigrationInterface {
    name = 'AreasImplementationMigration1687921375472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "area" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" ADD "area_id" integer`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "area_id" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_f36c17e792dc2f7a901d9d1c8bb" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_e9a35739ee896255c570a8448c5" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_e9a35739ee896255c570a8448c5"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_f36c17e792dc2f7a901d9d1c8bb"`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "area_id"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "area_id"`);
        await queryRunner.query(`DROP TABLE "area"`);
    }

}
