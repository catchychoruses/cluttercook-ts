import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('query');
  const sort = searchParams.get('sort');

  let sortingType;

  switch (sort) {
    case 'titledesc':
      sortingType = { title: Prisma.SortOrder.desc };
      break;
    case 'titleasc':
      sortingType = { title: Prisma.SortOrder.asc };
      break;
    case 'datedesc':
      sortingType = { createdAt: Prisma.SortOrder.desc };
      break;
    case 'dateasc':
      sortingType = { createdAt: Prisma.SortOrder.asc };
      break;
    default:
      sortingType = { title: Prisma.SortOrder.desc };
  }

  const session = await getServerSession(authOptions);

  const recipes = await prisma.recipe.findMany({
    where: {
      OR: [
        {
          title: {
            contains: Array.isArray(query) ? query[0] : query,
          },
        },
        {
          description: {
            contains: Array.isArray(query) ? query[0] : query,
          },
        },
      ],
      AND: [
        {
          user: {
            email: session?.user?.email,
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      description: true,
      picture: true,
    },
    orderBy: [sortingType],
  });

  console.log(recipes);
  return NextResponse.json(recipes);
}
