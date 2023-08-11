import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createReviewEntity1691774251669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: 'review',
            columns: [
                {
                    name: 'id',
                    type: 'int4',
					isPrimary: true,
                },
                {
                    name: 'tmdbId',
                    type: 'int4',
                },
                {
                    name: 'releaseDate',
                    type: 'varchar',
                },
                {
                    name: 'rating',
                    type: 'int4',
                },
            ]
        })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('review', true)
    }

}
