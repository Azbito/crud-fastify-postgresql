import { knex } from '@/database';

export async function getUsers() {
    const users = await knex('users').select();

    return { users };
}
