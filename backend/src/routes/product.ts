import type { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import { admin } from "../middleware/auth";

export default async function (fastify: FastifyInstance) {
	fastify.get("/api/products", async (request, reply) => {
		let isAdmin = false;

		const authHeader = request.headers.authorization;
		if (authHeader?.startsWith("Bearer ")) {
			try {
				const token = authHeader.replace("Bearer ", "");
				const decoded = fastify.jwt.verify(token) as { userId: number };
				const user = await prisma.user.findUnique({
					where: { id: decoded.userId },
				});
				isAdmin = !!user?.isAdmin;
			} catch {}
		}

		const products = await prisma.product.findMany();

		if (isAdmin) {
			reply.send(products);
		} else {
			const data = products.map(({ stock, ...rest }) => rest);
			reply.send(data);
		}
	});

	fastify.get("/api/products/:id", async (request, reply) => {
		let isAdmin = false;

		const authHeader = request.headers.authorization;
		if (authHeader?.startsWith("Bearer ")) {
			try {
				const token = authHeader.replace("Bearer ", "");
				const decoded = fastify.jwt.verify(token) as { userId: number };
				const user = await prisma.user.findUnique({
					where: { id: decoded.userId },
				});
				isAdmin = !!user?.isAdmin;
			} catch {}
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const productId = Number((request.params as any).id);
		if (Number.isNaN(productId)) {
			return reply.code(400).send({ error: "Invalid product id" });
		}
		const product = await prisma.product.findUnique({
			where: { id: productId }
		});

		if (isAdmin) {
			reply.send(product);
		} else {
			const data = {
				"id": product?.id,
				"name": product?.name,
				"price": product?.price
			};
			reply.send(data);
		}
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
