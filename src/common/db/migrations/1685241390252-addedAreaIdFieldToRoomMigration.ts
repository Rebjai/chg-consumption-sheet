import { MigrationInterface, QueryRunner } from "typeorm";

export class addedAreaIdFieldToRoomMigration1685241390252 implements MigrationInterface {
    name = 'addedAreaIdFieldToRoomMigration1685241390252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "area_id" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "area_id"`);
    }

}
