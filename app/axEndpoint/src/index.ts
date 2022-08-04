import fastify from 'fastify';

const app = fastify({
    logger: true,
});

app.get('/test', (request, reply) => {
    reply.send({ response: 'Ax Complete' });
});

app.listen({ port: 3000, host: '0.0.0.0' });

export { app };
