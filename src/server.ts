import { app } from '@/app';
import { env } from '@/env';
import { usersRouter } from './routes/users';
import { connect, knex } from './database';

async function startServer() {
    try {
        await connect();
        await knex.migrate.latest();

        app.register(usersRouter, {
            prefix: '/users',
        });

        await app.listen({
            host: '0.0.0.0',
            port: env.PORT,
        });
        console.log('🎈 HTTP Server running');
    } catch (error) {
        console.error('❌ Error starting server:', error);
    }
}

startServer();
