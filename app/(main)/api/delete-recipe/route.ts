import { deleteImage } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get('recipeId');

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId || '',
    },
    select: {
      picture: {
        select: {
          publicId: true,
        },
      },
    },
  });

  console.log(recipeId);

  const deletePicture = prisma.picture.delete({
    where: { recipeId: recipeId || undefined },
  });

  const deleteRecipe = prisma.recipe.delete({
    where: {
      id: recipeId || '',
    },
  });

  const transaction = await prisma.$transaction([deletePicture, deleteRecipe]);

  if (recipe && transaction) {
    await deleteImage(recipe?.picture?.publicId || null);
    return NextResponse.json(transaction);
  } else {
    return NextResponse.error();
  }
}
