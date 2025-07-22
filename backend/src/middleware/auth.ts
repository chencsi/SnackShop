import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export function authenticate(fastify: FastifyInstance) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const token = request.headers.authorization?.split(" ")[1];
			const user = fastify.jwt.verify(token as string);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(request as any).user = user;
		} catch {
			reply.code(401).send({ error: "Unauthorized" });
		}
	};
}

export function admin(fastify: FastifyInstance) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		await authenticate(fastify)(request, reply);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if (!(request as any).user?.isAdmin) {
			reply.code(403).send({ error: "Admin only" });
		}
	};
}
