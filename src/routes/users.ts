import { createUser } from '@/controllers/create-user';
import { getSingleUser } from '@/controllers/get-single-user';
import { getUsers } from '@/controllers/get-users';
import { removeUser } from '@/controllers/remove-user';
import { updateUser } from '@/controllers/update-user';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function usersRouter(app: FastifyInstance) {
    app.get('/', async (request, reply) => {
        const users = await getUsers();
        reply.send(users);
    });

    app.get('/:id', async (request, reply) => {
        const getUserParamSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = getUserParamSchema.parse(request.params);
        const user = await getSingleUser(id);
        reply.send(user);
    });

    app.post('/', async (request, reply) => {
        const newUser = await createUser(request, reply);
        reply.send(newUser);
    });

    app.delete('/:id', async (request, reply) => {
        const getUserParamSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = getUserParamSchema.parse(request.params);
        await removeUser(id);

        return reply.status(204).send(`User: [${id}] has been removed.`);
    });

    app.patch('/:id', async (request, reply) => {
        const updateUserSchema = z.object({
            email: z.string().email().optional(),
            name: z.string().optional(),
            password: z.string().optional(),
        });

        const getUserParamSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = getUserParamSchema.parse(request.params);
        const updateData = updateUserSchema.parse(request.body);

        const updatedUser = await updateUser(id, updateData);
        reply.send(updatedUser);
    });
}
