import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'catchychoruses',
      recipes: {
        create: [
          {
            title: 'Example Recipe 2',
            description: 'heee hooo',
            ingredients: 'heee hoooo',
            instructions: 'pooo',
          },
        ],
      },
    },
    include: {
      recipes: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect;
    process.exit(1);
  });
