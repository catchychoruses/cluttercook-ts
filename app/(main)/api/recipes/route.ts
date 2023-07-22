import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
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

  const session = await getServerSession(authOptions);

  const sessionData = await prisma.session.findFirst({
    where: {
      user: {
        name: session?.user?.name,
      },
    },
  });

  const data = await prisma.user.findUnique({
    where: { id: sessionData?.userId },
    select: {
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
        },
        orderBy: sortingType,
      },
    },
  });

  return NextResponse.json(data?.recipes);
}
