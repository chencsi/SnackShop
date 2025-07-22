import type { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import { authenticate, admin } from "../middleware/auth";

export default async function (fastify: FastifyInstance) {
	fastify.post(
		"/api/order",
		{ preHandler: [authenticate(fastify)] },
		async (request, reply) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const userId = (request as any).user.userId;
			const { items } = request.body as {
				items: { productId: number; quantity: number }[];
			};

			if (!Array.isArray(items) || items.length === 0) {
				return reply.code(400).send({ error: "There is no items" });
            }

			for (const item of items) {
				const prod = await prisma.product.findUnique({
					where: { id: item.productId },
				});

				if (!prod || prod.stock < item.quantity) {
					return reply
						.code(400)
						.send({ error: `Not enough stock for ${prod?.name}` });
				}
			}

			for (const item of items) {
				await prisma.product.update({
					where: { id: item.productId },
					data: { stock: { decrement: item.quantity } },
				});
			}
            
			const order = await prisma.order.create({
				data: {
					userId,
					items: {
						create: items.map((i) => ({
							productId: i.productId,
							quantity: i.quantity,
						})),
					},
				},
				include: { items: true },
			});
			reply.send(order);
		},
	);

	fastify.get(
		"/api/orders",
		{ preHandler: [admin(fastify)] },
		async (_request, reply) => {
			const orders = await prisma.order.findMany({
				include: {
					user: true,
					items: { include: { product: true } },
				},
			});
			reply.send(orders);
		},
	);
}
