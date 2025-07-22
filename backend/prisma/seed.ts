import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const username = "admin";
	const password = "SnackBoss2025";
	let admin = await prisma.user.findUnique({ where: { username } });
	if (!admin) {
		const hashedPassword = await bcrypt.hash(password, 10);
		admin = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
				isAdmin: true,
			},
		});
	}

	let guest = await prisma.user.findUnique({ where: { username: "guest" } });
	if (!guest) {
		guest = await prisma.user.create({
			data: {
				username: "guest",
				password: await bcrypt.hash("guestpw", 10),
				isAdmin: false,
			},
		});
	}

	const productData = [
		{ name: "Chips", price: 450, stock: 50 },
		{ name: "Csoki", price: 390, stock: 30 },
		{ name: "Mogyoró", price: 550, stock: 20 },
		{ name: "Keksz", price: 250, stock: 40 },
	];

	const existingProducts = await prisma.product.findMany();
	let products = existingProducts;
	if (products.length === 0) {
		for (const prod of productData) {
			await prisma.product.create({ data: prod });
		}
		products = await prisma.product.findMany();
	}

	await prisma.order.create({
		data: {
			userId: guest.id,
			items: {
				create: [
					{ productId: products[2].id, quantity: 3 },
					{ productId: products[3].id, quantity: 5 },
				],
			},
		},
	});
}

main()
	.catch((e) => {
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
