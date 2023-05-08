// import { MigrationInterface, QueryRunner } from "typeorm";

// export class MYSQLCOMPATMigration.ts1683438116647 implements MigrationInterface {
//     name = 'MYSQLCOMPATMigration.ts1683438116647'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "FK_CONSUMPTION_SHEET_PATIENT_ID"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "FK_CONSUMPTION_SHEET_ROOM_ID"`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_staff_user_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_0fc93b6c16d66d8cac7580e6c61"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "PK_3102f5818abac0545272528bcff"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "id" SERIAL NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "PK_3102f5818abac0545272528bcff" PRIMARY KEY ("id")`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "UQ_ce6fe55c4903708850ba89a967a"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "patient_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "patient_id" integer NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "UQ_ce6fe55c4903708850ba89a967a" UNIQUE ("patient_id")`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "room_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "room_id" integer NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "diagnosis"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "diagnosis" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "doctor"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "doctor" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_4f79974192afdc1fb9c10e41233"`);
//         await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_cace4a159ff9f2512dd42373760"`);
//         await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9"`);
//         await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "name"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "name" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "first_surname"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "first_surname" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "second_surname"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "second_surname" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "user_id"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "user_id" integer`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "telephone_number"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "telephone_number" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "job_title"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "job_title" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_baeea2c4c8215d93bd25467921a"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "consumption_sheet_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "consumption_sheet_id" integer NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "product_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "product_id" integer NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "staff_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "staff_id" integer`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "user_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "user_id" integer NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "FK_ce6fe55c4903708850ba89a967a" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "FK_6fdf8e1a7854a8cbaff418f4a9e" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_0fc93b6c16d66d8cac7580e6c61" FOREIGN KEY ("consumption_sheet_id") REFERENCES "consumption_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_baeea2c4c8215d93bd25467921a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_4f79974192afdc1fb9c10e41233" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_4f79974192afdc1fb9c10e41233"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_baeea2c4c8215d93bd25467921a"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP CONSTRAINT "FK_0fc93b6c16d66d8cac7580e6c61"`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "FK_6fdf8e1a7854a8cbaff418f4a9e"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "FK_ce6fe55c4903708850ba89a967a"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "user_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "user_id" bigint NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "staff_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "staff_id" bigint`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "product_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "product_id" bigint NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" DROP COLUMN "consumption_sheet_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD "consumption_sheet_id" bigint NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_c6769cc6c8f0fa486979d64d2f1" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_baeea2c4c8215d93bd25467921a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "job_title"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "job_title" character varying(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "telephone_number"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "telephone_number" character varying(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "user_id"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "user_id" bigint`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "second_surname"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "second_surname" character varying(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "first_surname"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "first_surname" character varying(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "name"`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD "name" character varying(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
//         await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("id", "email")`);
//         await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id")`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_4f79974192afdc1fb9c10e41233" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "doctor"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "doctor" character varying(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "diagnosis"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "diagnosis" character varying(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "room_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "room_id" bigint NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "UQ_ce6fe55c4903708850ba89a967a"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "patient_id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "patient_id" bigint NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "UQ_ce6fe55c4903708850ba89a967a" UNIQUE ("patient_id")`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP CONSTRAINT "PK_3102f5818abac0545272528bcff"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" DROP COLUMN "id"`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD "id" BIGSERIAL NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "PK_3102f5818abac0545272528bcff" PRIMARY KEY ("id")`);
//         await queryRunner.query(`ALTER TABLE "consumption_detail" ADD CONSTRAINT "FK_0fc93b6c16d66d8cac7580e6c61" FOREIGN KEY ("consumption_sheet_id") REFERENCES "consumption_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_staff_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "FK_CONSUMPTION_SHEET_ROOM_ID" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "consumption_sheet" ADD CONSTRAINT "FK_CONSUMPTION_SHEET_PATIENT_ID" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

// }
