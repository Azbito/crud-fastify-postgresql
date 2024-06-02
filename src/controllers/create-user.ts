import { knex } from '@/database';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';

export async function createUser(request: any) {
    const createUserBodySchema = z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
    });

    const { email, name, password } = createUserBodySchema.parse(request.body);

    const hashedPassword = await hash(password, 10);

    await knex('users').insert({
        id: randomUUID(),
        email,
        name,
        password: hashedPassword,
    });
}
