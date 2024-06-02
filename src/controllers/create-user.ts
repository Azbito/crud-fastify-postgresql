import { knex } from '@/database';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';
import nodemailer from 'nodemailer';
import { env } from '@/env';

async function sendConfirmationEmail(email: string) {
    const transporter = nodemailer.createTransport({
        host: 'live.smtp.mailtrap.io',
        port: 587,
        auth: {
            user: env.USERNAME,
            pass: env.USERNAME_PASSWORD,
        },
    });

    const mailOptions = {
        from: env.FROM_EMAIL,
        to: email,
        subject: 'Registration Confirmation',
        html: '<b>Welcome to Old Eden!</b> <p>We hope you have a good journey with us! ❤️</p>',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send confirmation email');
    }
}

export async function createUser(request: any, reply: any) {
    const createUserBodySchema = z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string().min(6),
    });

    try {
        const { email, name, password } = createUserBodySchema.parse(
            request.body,
        );

        const hashedPassword = await hash(password, 10);

        await knex('users').insert({
            id: randomUUID(),
            email,
            name,
            password: hashedPassword,
        });

        await sendConfirmationEmail(email);

        return reply.status(201).send();
    } catch (error) {
        console.error('Error creating user:', error);
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
}
