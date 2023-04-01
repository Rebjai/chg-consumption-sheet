import {
    MigrationInterface,
    QueryRunner
} from "typeorm"

export class StaffTableMigration1680371912821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "staff" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "first_surname" character varying NOT NULL,
                "second_surname" character varying NOT NULL,
                "date_of_birth" TIMESTAMP NOT NULL,
                "user_id" integer,
                "telephone_number" character varying NOT NULL,
                "job_title" character varying NOT NULL,
                CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id")
                )`
        );
        await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e"`);
        await queryRunner.query(`DROP TABLE "staff"`);
    }

}
