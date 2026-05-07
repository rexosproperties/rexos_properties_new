import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const members = [
  { name: "Albert Okala", role: "CEO", order: 0 },
  { name: "Damilola Dyedayo", role: "Project Manager", order: 1 },
  { name: "Emmanuel Effong", role: "Marketing Manager", order: 2 },
  { name: "Amarachi Anyaoku", role: "Sales Manager", order: 3 },
];

const existing = await prisma.teamMember.findMany();
if (existing.length > 0) {
  console.log(
    `Skipped — ${existing.length} team members already exist. Manage them in /admin/team.`,
  );
} else {
  for (const m of members) {
    await prisma.teamMember.create({ data: m });
    console.log(`✓ ${m.name}`);
  }
  console.log(`\nSeeded ${members.length} team members.`);
}

await prisma.$disconnect();
