import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    PORT: z.coerce.number().default(3333),
    CONNECTION_STRING: z.string(),
    USERNAME: z.string(),
    USERNAME_PASSWORD: z.string(),
    FROM_EMAIL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.log('❌ Invalid environment variables', _env.error.format());
    throw new Error('Invalid environment variables');
}

export const env = _env.data;
