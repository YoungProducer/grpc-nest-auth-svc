import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1684167740666 implements MigrationInterface {
  name = 'Init1684167740666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "confirmation_tokens" (
                "id" SERIAL NOT NULL,
                "token" character varying NOT NULL,
                "expirationDate" TIMESTAMP(3) WITH TIME ZONE NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                CONSTRAINT "PK_e48a0124b300b3b1e14d8b7baa4" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "refresh_tokens" (
                "id" SERIAL NOT NULL,
                "token" character varying NOT NULL,
                "userId" integer,
                CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "auth_users" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "salt" character varying NOT NULL,
                "hash" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                "confirmationTokenId" integer,
                CONSTRAINT "UQ_8852f85982c3947febf76e36810" UNIQUE ("username"),
                CONSTRAINT "UQ_13d8b49e55a8b06bee6bbc828fb" UNIQUE ("email"),
                CONSTRAINT "REL_9bd25dcc75716ba8cbe110dae1" UNIQUE ("confirmationTokenId"),
                CONSTRAINT "PK_c88cc8077366b470dafc2917366" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "refresh_tokens"
            ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "auth_users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "auth_users"
            ADD CONSTRAINT "FK_9bd25dcc75716ba8cbe110dae11" FOREIGN KEY ("confirmationTokenId") REFERENCES "confirmation_tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "auth_users" DROP CONSTRAINT "FK_9bd25dcc75716ba8cbe110dae11"
        `);
    await queryRunner.query(`
            ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"
        `);
    await queryRunner.query(`
            DROP TABLE "auth_users"
        `);
    await queryRunner.query(`
            DROP TABLE "refresh_tokens"
        `);
    await queryRunner.query(`
            DROP TABLE "confirmation_tokens"
        `);
  }
}
