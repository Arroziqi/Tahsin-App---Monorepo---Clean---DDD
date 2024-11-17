import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const roles = await prisma.role.createMany({
    data: [
      { name: 'Admin' },
      { name: 'Student' },
      { name: 'Teacher' }
    ],
    skipDuplicates: true // Skip if role already exists
  });

  console.log(`Roles seeded: ${roles.count}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
