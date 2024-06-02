import { knex } from '@/database';
import { getSingleUser } from './get-single-user';

interface UpdateUserData {
    email?: string;
    name?: string;
    password?: string;
}

async function updateUser(
    id: string,
    updateData: UpdateUserData,
): Promise<any> {
    if (Object.keys(updateData).length === 0) {
        console.error('❌ No valid fields provided for update');
        throw new Error('No valid fields provided for update');
    }

    await knex('users').where({ id }).update(updateData);

    return getSingleUser(id);
}

export { updateUser, UpdateUserData };
