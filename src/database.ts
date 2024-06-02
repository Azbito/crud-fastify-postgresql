import { env } from './env';
import { Pool } from 'pg';

import { knex as setupKnex, Knex } from 'knex';

export const config: Knex.Config = {
    client: 'pg',
    connection: env.CONNECTION_STRING,
    migrations: {
        extension: 'ts',
        directory: 'db/migrations',
    },
    debug: true,
    useNullAsDefault: true,
};

export const knex = setupKnex(config);

export async function connect() {
    const pool = new Pool({
        connectionString: env.CONNECTION_STRING,
    });

    const client = await pool.connect();

    if (client) {
        console.log('🌊 Created pool connection');
    }

    const res = await client.query('Select now()');
    console.log(res.rows[0]);

    return client;
}
