import {
    MigrationInterface,
    QueryRunner
} from "typeorm"

export class RoomTableMigration1680371912823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "room" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "status" integer NOT NULL,
                "type" integer NOT NULL,
                CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
