import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';

import userRoutes from './routes/user';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

const fastify = Fastify({ logger: true });
fastify.register(fastifyJwt, { secret: 'snackshopsecretkey' });

userRoutes(fastify);
productRoutes(fastify);
orderRoutes(fastify);

fastify.listen({ port: 3001, host: '0.0.0.0' });