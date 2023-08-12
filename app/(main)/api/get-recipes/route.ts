import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { SORTING_TYPES } from '@/lib/types';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const pageIndex = searchParams.get('page') as unknown as number;

  const pagination = {
    skip: pageIndex === 1 ? 0 : 10 * pageIndex - 10,
    take: 10,
  };

  let sortingType;

  switch (sort) {
    case SORTING_TYPES.TITLE_DESC:
      sortingType = { title: Prisma.SortOrder.desc };
      break;
    case SORTING_TYPES.TITLE_ASC:
      sortingType = { title: Prisma.SortOrder.asc };
      break;
    case SORTING_TYPES.DATE_DESC:
      sortingType = { createdAt: Prisma.SortOrder.desc };
      break;
    case SORTING_TYPES.DATE_ASC:
      sortingType = { createdAt: Prisma.SortOrder.asc };
      break;
    default:
      sortingType = { title: Prisma.SortOrder.desc };
  }

  const session = await getServerSession(authOptions);
  try {
    if (session?.user?.email) {
      const recipes = await prisma.recipe.findMany({
        where: {
          OR: [
            {
              title: {
                contains: Array.isArray(query) ? query[0] : query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: Array.isArray(query) ? query[0] : query,
                mode: 'insensitive',
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
        ...pagination,
      });

      const totalRecipes = await prisma.recipe.count({
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
      });

      return NextResponse.json({
        totalRecipes: totalRecipes,
        totalPages: Math.ceil(totalRecipes / 10),
        recipes: recipes,
      });
    }
  } catch (err) {
    return NextResponse.error();
  }
}
