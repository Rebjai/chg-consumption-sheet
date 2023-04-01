import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTablesSetupMigration1680371667788 implements MigrationInterface {
    name = 'InitialTablesSetupMigration1680371667788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('1', '2', '10')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
