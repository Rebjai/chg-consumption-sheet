import {
    MigrationInterface,
    QueryRunner
} from "typeorm"

export class ConsumptionDetailTableMigration1680372035220 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "consumption_detail" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "consumption_sheet_id" integer NOT NULL,
                "product_id" integer NOT NULL,
                "staff_id" integer NOT NULL,
                "quantity" integer NOT NULL,
                "total" integer NOT NULL,
                CONSTRAINT "PK_e15d9ecacc925792f7866ecd615" PRIMARY KEY ("id")
            )`
        );
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_0fc93b6c16d66d8cac7580e6c61" FOREIGN KEY ("consumption_sheet_id") REFERENCES "consumption_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_baeea2c4c8215d93bd25467921a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1"`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_baeea2c4c8215d93bd25467921a"`);
        await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_0fc93b6c16d66d8cac7580e6c61"`);
        await queryRunner.query(`DROP TABLE "consumption_detail"`);
    }

}
