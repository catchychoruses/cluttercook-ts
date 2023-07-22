import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
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
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: [sortingType],
  });

  return NextResponse.json(recipes);
}