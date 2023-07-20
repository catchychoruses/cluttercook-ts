import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

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
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: [sortingType],
  });

  return NextResponse.json(recipes);
}
