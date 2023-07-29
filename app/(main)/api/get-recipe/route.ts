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
      picture: {
        select: {
          url: true,
          publicId: true,
        },
      },
    },
  });

  if (recipe) {
    return NextResponse.json(recipe);
  } else {
    return NextResponse.error();
  }
}
