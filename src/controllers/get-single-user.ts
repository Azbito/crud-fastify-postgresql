import { knex } from '@/database';

export async function getSingleUser(id: string) {
    const user = await knex('users').where({ id }).select();

    return { user };
}
