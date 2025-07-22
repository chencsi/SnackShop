import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const username = "admin";
	const password = "SnackBoss2025";

	const existing = await prisma.user.findUnique({ where: { username } });
	if (existing) {
		console.log("Admin user already exists");
		return;
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.create({
		data: {
			username,
			password: hashedPassword,
			isAdmin: true,
		},
	});

	console.log("Admin user created");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
