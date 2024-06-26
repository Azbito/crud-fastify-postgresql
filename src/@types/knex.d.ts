import { Knex } from 'knex';

declare module 'knex/types/tables' {
    export interface Tables {
        users: {
            id: string;
            email: string;
            name: string;
            password: string;
            created_at: string;
            session_id: string;
        };
    }
}
