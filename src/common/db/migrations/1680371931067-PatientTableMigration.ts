import {
    MigrationInterface,
    QueryRunner
} from "typeorm"

export class PatientTableMigration1680371931067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "patient" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "first_surname" character varying NOT NULL,
                "second_surname" character varying NOT NULL,
                "name" character varying NOT NULL,
                "date_of_birth" TIMESTAMP NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
