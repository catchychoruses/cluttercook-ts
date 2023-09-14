import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { CreateResponsePictureData } from '../../types';

type Recipe = {
  recipeId: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: CreateResponsePictureData;
};

export async function POST(req: NextRequest) {
  const recipe: Recipe = await req.json();

  try {
    const update = await prisma.recipe.update({
      where: {
        id: recipe.recipeId,
      },
      data: {
        title: recipe.title,
        description: recipe.description,
        instructions: recipe.instructions,
        ingredients: recipe.ingredients,
        picture: {
          update: {
            data: {
              url: recipe.image.URL,
              publicId: recipe.image.publicId,
            },
          },
        },
      },
    });

    return NextResponse.json({
      ...update,
      ingredients: update.ingredients.map((ingredient) => ({
        ingredient: ingredient,
      })),
      instructions: update.instructions.map((instruction) => ({
        instruction: instruction,
      })),
    });
  } catch (err) {
    return NextResponse.error();
  }
}
