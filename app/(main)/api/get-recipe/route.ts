import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get('recipeId');

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId || '',
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      description: true,
      ingredients: true,
      instructions: true,
      url: true,
      picture: {
        select: {
          url: true,
          publicId: true,
        },
      },
    },
  });

  if (recipe) {
    return NextResponse.json({
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) => ({
        ingredient: ingredient,
      })),
      instructions: recipe.instructions.map((instruction) => ({
        instruction: instruction,
      })),
      image: {
        URL: recipe.picture?.url,
        publicId: recipe.picture?.publicId,
      },
      URL: recipe.url,
    });
  } else {
    return NextResponse.error();
  }
}
