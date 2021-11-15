import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAdm1636336941821 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'adm',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'nome',
          type: 'varchar',
        },
        {
          name: 'nome_empresa',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',

        },
        {
          name: 'senha',
          type: 'varchar',
        },
        {
          name: 'chave_acesso',
          type: 'varchar',
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('adm');
  }

}
