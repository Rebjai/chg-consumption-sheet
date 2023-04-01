import {
    MigrationInterface,
    QueryRunner
} from "typeorm"

export class ConsumptionSheetTableMigration1680371933301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "consumption_sheet" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "patient_id" integer NOT NULL,
                "room_id" integer NOT NULL,
                "diagnosis" character varying NOT NULL,
                "doctor" character varying NOT NULL,
                "discharge_date" TIMESTAMP,
                "admission_date" TIMESTAMP NOT NULL,
                CONSTRAINT "REL_ce6fe55c4903708850ba89a967" UNIQUE ("patient_id"),
                CONSTRAINT "PK_3102f5818abac0545272528bcff" PRIMARY KEY ("id")
            )`
        );
        await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "FK_ce6fe55c4903708850ba89a967a" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "FK_6fdf8e1a7854a8cbaff418f4a9e" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "FK_6fdf8e1a7854a8cbaff418f4a9e"`);
        await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "FK_ce6fe55c4903708850ba89a967a"`);
        await queryRunner.query(`DROP TABLE "consumption_sheet"`);
    }

}
