import prisma from '@/lib/prisma';
import { UploadApiResponse } from 'cloudinary';
import { ImageResponse, NextRequest, NextResponse } from 'next/server';

type Recipe = {
  recipeId: string | null;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  picture: {
    base64Picture: string;
    publicId: string;
  };
};

export async function POST(req: NextRequest) {
  const recipeNewData: Recipe = await req.json();

  const imageRes: UploadApiResponse | undefined = await fetch(
    'http://localhost:3000/api/upload-image',
    {
      method: 'POST',
      body: JSON.stringify({
        base64Picture: recipeNewData.picture.base64Picture,
        publicId: recipeNewData.picture.publicId,
      }),
      headers: { 'Content-type': 'application/json' },
    }
  ).then((data) => data.json());

  try {
    if (imageRes && recipeNewData.recipeId) {
      const update = await prisma.recipe.update({
        where: {
          id: recipeNewData.recipeId,
        },
        data: {
          title: recipeNewData.title,
          description: recipeNewData.description,
          instructions: recipeNewData.instructions,
          ingredients: recipeNewData.ingredients,
          picture: {
            update: {
              data: {
                url: imageRes.secure_url,
                publicId: imageRes.public_id,
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
    }
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
