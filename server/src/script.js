import { prisma } from './lib/prisma.js';

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Divyansh',
      email: 'divyansh@prisma.io',
    },
  });
  console.log('Created user:', user);

  // Fetch all users
  const users = await prisma.user.findMany();
  console.log('All users:', users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());