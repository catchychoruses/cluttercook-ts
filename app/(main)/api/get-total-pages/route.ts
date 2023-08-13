import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('query');

  const session = await getServerSession(authOptions);
  try {
    if (session?.user?.email) {
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
      });
    }
  } catch (err) {
    return NextResponse.error();
  }
}
