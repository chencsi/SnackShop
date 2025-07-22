import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

import userRoutes from './routes/user';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

const fastify = Fastify({ logger: true });

fastify.get("/", async () => {
	return { message: "Server is running" };
});

fastify.register(fastifyJwt, { secret: 'supersecretkey' });

userRoutes(fastify);
productRoutes(fastify);
orderRoutes(fastify);

(async () => {
	try {
		await fastify.listen({ port: 3001, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
