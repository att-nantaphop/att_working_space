import fastify from 'fastify';

import { getObservable } from './utils/delay';

const app = fastify({
    logger: true,
});

// eslint-disable-next-line @typescript-eslint/naming-convention
app.post<{ Body: { email: string; phoneNum: string } }>(
    '/sendInfo',
    {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    phoneNum: { type: 'string' },
                },
            },
        },
    },
    (req, reply) => {
        const email = req.body.email;
        const phoneNum = req.body.phoneNum;

        getObservable(email, phoneNum).subscribe({
            next(x) {
                console.log(x);
            },
            error(err) {
                console.error('sent fail !!' + err);
            },
            complete() {
                reply
                    .status(200)
                    .send(`Send email complete ${email}\nSend sms complete ${phoneNum}`);
            },
        });
    },
);

export { app };
