import { knex } from '@/database';

export async function removeUser(id: string) {
    try {
        await knex('users').where({ id }).del();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
