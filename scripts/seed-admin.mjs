import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL ?? "info@rexosproperties.com";
const password = process.env.ADMIN_PASSWORD ?? "RexosAdmin2026!";
const name = process.env.ADMIN_NAME ?? "Rex'o's Admin";

const hash = await bcrypt.hash(password, 12);

const admin = await prisma.admin.upsert({
  where: { email },
  update: { password: hash, name },
  create: { email, password: hash, name },
});

console.log(`Admin seeded: ${admin.email}`);
console.log(`Temporary password: ${password}`);
console.log("Change it after your first login.");

await prisma.$disconnect();
