import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createMovieEntity1691774394801 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: 'movie',
            columns: [
                {
                    name: 'id',
                    type: 'int4',
					isPrimary: true,
					
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'releaseDate',
                    type: 'varchar',
                },
                {
                    name: 'poster',
                    type: 'varchar',
                },
                {
                    name: 'overview',
                    type: 'varchar',
                },
                {
                    name: 'tmdbId',
                    type: 'int4',
                },
                {
                    name: 'reviewId',
                    type: 'int4',
                    isNullable: true
                },
            ],
            foreignKeys: [
                new TableForeignKey({
                    columnNames: ['reviewId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'review'
                }),
            ],
        })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movie', true, true)
    }

}
