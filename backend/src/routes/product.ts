import type { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import { admin } from "../middleware/auth";

export default async function (fastify: FastifyInstance) {
	fastify.get("/api/products", async (_req, reply) => {
		const products = await prisma.product.findMany();
		reply.send(products);
	});

	fastify.post(
		"/api/products",
		{ preHandler: [admin(fastify)] },
		async (request, reply) => {
			const { name, price, stock } = request.body as {
				name: string;
				price: number;
				stock: number;
			};
			
            if (!name || typeof price !== "number" || typeof stock !== "number") {
				return reply.code(400).send({ error: "Missing fields" });
            }
			
            const product = await prisma.product.create({
				data: { name, price, stock },
			});
			reply.send(product);
		},
	);

	fastify.put(
		"/api/products/:id",
		{ preHandler: [admin(fastify)] },
		async (request, reply) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const id = Number((request.params as any).id);
			const { name, price, stock } = request.body as {
				name?: string;
				price?: number;
				stock?: number;
			};
			const product = await prisma.product.update({
				where: { id },
				data: { name, price, stock },
			});
			reply.send(product);
		},
	);

	fastify.delete(
		"/api/products/:id",
		{ preHandler: [admin(fastify)] },
		async (request, reply) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const id = Number((request.params as any).id);
			await prisma.product.delete({ where: { id } });
			reply.send({ success: true });
		},
	);
}
