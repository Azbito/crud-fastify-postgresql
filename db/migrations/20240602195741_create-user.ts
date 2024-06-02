import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => {
        table.uuid('id').primary().unique();
        table.text('email').notNullable().unique();
        table.text('name').notNullable;
        table.text('password').notNullable;
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}
