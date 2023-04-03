import { MigrationInterface, QueryRunner } from "typeorm";

export class PoductSatCategoryMigration1680371722230 implements MigrationInterface {
    name = 'PoductSatCategoryMigration1680371722230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "product_sat_category" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP, "code" integer NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_fa539f9bee8de82df4a98a425a9" PRIMARY KEY ("id")
            )`
        );
        await queryRunner.query(`CREATE INDEX "IDX_1e6f6cf1071046caa42ba53b0a" ON "product_sat_category" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_1e6f6cf1071046caa42ba53b0a"`);
        await queryRunner.query(`DROP TABLE "product_sat_category"`);
    }

}

