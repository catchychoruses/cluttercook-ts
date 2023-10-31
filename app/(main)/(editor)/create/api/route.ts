import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { CreateRecipeRequest } from '../../types';

export async function POST(req: NextRequest) {
  const recipe: CreateRecipeRequest = await req.json();
  let imageRes = {
    secureURL:
      'https://res.cloudinary.com/ddfxnnmki/image/upload/v1691507606/Artboard_6_ncypek.jpg',
    publicId: 'Placeholder',
  };

  if (recipe.image) {
    imageRes = {
      secureURL: recipe.image.URL,
      publicId: recipe.image.publicId,
    };
  }
  const session = await getServerSession(authOptions);

  try {
    if (session?.user?.email) {
      await prisma.appUser.update({
        where: { email: session?.user?.email },
        data: {
          recipes: {
            create: [
              {
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                url: recipe.URL,
                tags: recipe.tags.split(' '),
                picture: {
                  create: {
                    url: imageRes.secureURL,
                    publicId: imageRes.publicId,
                  },
                },
              },
            ],
          },
        },
      });

      return NextResponse.json('Created Recipe Successfully');
    }
  } catch (err) {
    return NextResponse.error();
  }
}
