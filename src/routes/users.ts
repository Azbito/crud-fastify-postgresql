import { createUser } from '@/controllers/create-user';
import { getUsers } from '@/controllers/get-users';
import { FastifyInstance } from 'fastify';

export async function usersRouter(app: FastifyInstance) {
    app.get('/', async (request, reply) => {
        const users = await getUsers();
        reply.send(users);
    });

    app.post('/', async (request, reply) => {
        const newUser = await createUser(request, reply);
        reply.send(newUser);
    });
}
