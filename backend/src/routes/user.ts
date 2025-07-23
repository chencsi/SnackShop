import type { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";

export default async function (fastify: FastifyInstance) {
	fastify.get("/api/user", async (req, reply) => {
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader) {
				return reply.code(401).send({ error: "Not authenticated" });
			}
			const token = authHeader.replace("Bearer ", "");
			const decoded = fastify.jwt.verify(token) as { userId: number };
			const user = await prisma.user.findUnique({
				where: { id: decoded.userId },
			});
			if (!user) {
				return reply.code(404).send({ error: "User not found" });
			}
			reply.send(user);
		} catch (err) {
			return reply.code(401).send({ error: "Invalid token" });
		}
	});

	fastify.post("/api/register", async (request, reply) => {
		const { username, password } = request.body as {
			username: string;
			password: string;
		};

		if (!username || !password) {
			return reply.code(400).send({ error: "Missing fields" });
		}

		const exists = await prisma.user.findUnique({ where: { username } });
		if (exists) {
			return reply.code(409).send({ error: "User already exists" });
		}

		const hashed = await bcrypt.hash(password, 10);
		await prisma.user.create({ data: { username, password: hashed } });
		reply.send({ success: true });
	});

	fastify.post("/api/login", async (request, reply) => {
		const { username, password } = request.body as {
			username: string;
			password: string;
		};
		const user = await prisma.user.findUnique({ where: { username } });

		if (!user) {
			return reply.send({ authenticated: false });
		}

		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			return reply.send({ authenticated: false });
		}
		const token = fastify.jwt.sign({
			userId: user.id,
			isAdmin: user.isAdmin,
			username: user.username,
		});
		reply.send({ authenticated: true, isAdmin: user.isAdmin, token });
	});
}
